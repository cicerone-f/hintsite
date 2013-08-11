/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Hint",
  "views/sub/Header_VS",
  "views/LoadingView",
  "leaflet",
  "text!templates/main/map.html",
  "views/main/Error_VM"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Hint,
    Header_VS,
    LoadingView,
    leaflet,
    template,
    Error_VM
  ) {

    // NOTES
    //  - in this module, this.map refers to the current map
    //  - you'll see position.lat/lng along with position.coords.longitude: the
    //    first case is for when you use a **Leaflet** position object, the second
    //    case is for when you use a **Parse** GeoPoint object. We tried to use the
    //    Parse object as much as we could in order to stay consistent.


    var ks = {
      VIEWFINDER_EXT_RADIUS: 50,
      VIEWFINDER_INT_RADIUS: 4,
      PIN_WIDTH: 60,
      PIN_HEIGHT: 47
    };


    var SetHintPosition_VM = Parse.View.extend({
      tagName: 'div',
      id: 'container',
      model: Hint,
      events: {
        /* a click on the "Set Point" button */
        "click #set-point-btn": "setGeoPoint"
      },

      template: Handlebars.compile(template),

      initialize: function () {
        this.model = new Hint();
        this.flagEvent = false;
        this.model.id = this.options.hintIdToGet;
        this.model.on('HintForm_VM_HINTSYNC', this.renderVero, this);

        /* this event is triggerent when a GeoPoint is saved to Parse */
        this.model.on('SetHintPosition_VM_POINTUPDATED', this.setGeoPointCallback, this);
        this.model.fetchFromP();
      },

      render: function (eventName) {
        var header = new Header_VS({owner: "SetHintPosition_VM" , backViewModelId:this.model.id  });
        //var title = "Select Point for Hint #" + this.model.attributes.number;
        $(this.el).html(header.render().el);

        return this;
      },


      renderVero: function (eventName) {
        var header = new Header_VS({owner: "SetHintPosition_VM" , backViewModelId:this.model.id  });
        //var title = "Select Point for Hint #" + this.model.attributes.number;
        $(this.el).html(header.render().el).append(this.template());
        this.renderMap();
        return this;
      },
      


      renderMap: function () {
        var self = this;

          var position = self.model.attributes.point;

          /* creates the map object */
          self.map = L.map(self.$('#map')[0]);

          /* creates the actual map layer (still without a real map though) and adds it to the map */
          L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
            //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 16,
            minZoom: 14
          }).addTo(self.map);

          /* extending Leaflet in order to create a "Locate me" control */
          L.Control.LocateMe = L.Control.extend({
            options: {
              position: 'topright'
            },
            onAdd: function (map) {
              var controlDiv = L.DomUtil.create('div', 'locate-me-btn');

              L.DomEvent
                .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
                .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
                .addListener(controlDiv, 'click', function () { self.panToCurrentPosition(); });
              // we had to call self.panToCurrentPosition() inside an anonymous function because of context issued:
              // when passed as a callback, the first line (var self = this) would refer to the object that called
              // the function and not to the View

              var icon = L.DomUtil.create('img', 'locate-me-icon', controlDiv);
              icon.setAttribute('src', 'res/img/locate-me-icon.png');

              return controlDiv;
            }
          });
          self.map.addControl(new L.Control.LocateMe({}));

          /* 
            checks if there's a point saved on the model:
            if there is one, centers the map on that point and adds the marker on that point;
            if there isn't, centers the map on the current location (taken from Cordova) and
            doesn't place any viewfinder;
          */
          var modelPoint = self.model.attributes.point;
          if (modelPoint) {
            // there is one: centers the map on the model's point and adds the marker on that point
            self.map.setView([modelPoint.latitude, modelPoint.longitude], 15);
            self.setMarkerFromPoint(modelPoint);
            self.createViewfinder();

          } else {
            // no point on the model: centers the map on the current location (taken from Cordova) and
            // doesn't place any viewfinder
            navigator.geolocation.getCurrentPosition(
              // success
              function (currPosition) {
                self.map.setView([currPosition.coords.latitude, currPosition.coords.longitude], 15);
                self.createViewfinder();
              },
              // error
              null,
              // options
              {enableHighAccuracy: true, timeout: 20000}
            );
          }
          setTimeout(function(){$("#overlay-loading").fadeOut();},1000);

      },

      panToCurrentPosition: function () {
        var self = this;
        navigator.geolocation.getCurrentPosition(
          // success
          function (currPosition) {
            self.map.panTo([currPosition.coords.latitude, currPosition.coords.longitude]);
          },
          // error
          function(error) {
            var ErrorView = new Error_VM({errorMsg: launchability});
            ErrorView.render();
          },
          // options
          {enableHighAccuracy: true, timeout: 20000}
        );
      },

      createViewfinder: function () {
        /* creates the center of the viewfinder and adds it to the map */
        var viewfinderCenterRadius;
        this.viewfinderCenter = L.circleMarker(this.map.getCenter(), {
          stroke: false,
          fill: true,
          fillColor: '#222',
          fillOpacity: 0.9,
          clickable: false,
          radius: ks.VIEWFINDER_INT_RADIUS
        }).addTo(this.map);

        /* creates the external circle of the viewfinder and adds it to the map */
        this.viewfinder = L.circleMarker(this.map.getCenter(), {
          color: '#555',      // color of the stroke
          weight: 2,          // width of the stroke radius
          fill: true,         // whether the circle is filled
          fillColor: '#555',
          fillOpacity: 0.2,
          clickable: false,
          radius: ks.VIEWFINDER_EXT_RADIUS
        }).addTo(this.map);

        /* relocates the viewfinder to the current center of the map when the map moves*/
        var self = this;
        this.map.on('move', function (e) {
          self.viewfinder.setLatLng(self.map.getCenter());
          self.viewfinderCenter.setLatLng(self.map.getCenter());
        });
      },

      setGeoPoint: function () {
        var currentCenter = this.map.getCenter();

        /* uploading current center to Parse */
        var parseCurrentCenter = new Parse.GeoPoint(currentCenter.lat, currentCenter.lng);
        this.model.attributes.point = parseCurrentCenter;
        this.model.updateGeoPoint(parseCurrentCenter);

        this.setMarkerFromPoint(parseCurrentCenter);
        setTimeout(function(){$("#overlay-loading").fadeIn()},500);
        setTimeout(function(){$("#back").click()},2000);
      },

      setMarkerFromPoint: function (point) {
        if (this.pin) {
          this.map.removeLayer(this.pin);
        }

        var pinIcon = new L.Icon({
          iconUrl: 'res/img/pin-with-shadow.png',            // absolute URL
          iconSize: new L.Point(ks.PIN_WIDTH, ks.PIN_HEIGHT), // in px
          iconAnchor: new L.Point(20, 10),                    // in px, offset from the center of the icon
        });

        /* creates the pin and adds it to the map */
        this.pin = L.marker([point.latitude, point.longitude], {
          icon: pinIcon
        }).addTo(this.map);
      },

      setGeoPointCallback: function () {
        //this.loading.remove();
      }

    });
    return SetHintPosition_VM;
  });