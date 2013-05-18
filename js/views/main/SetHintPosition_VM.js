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
  "text!templates/main/map.html"
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
    template
  ) {

    // in this module, this.map refers to the current map

    var ks = {
      VIEWFINDER_EXT_RADIUS: 150,
      VIEWFINDER_INT_RADIUS: 8,
      PIN_WIDTH: 60,
      PIN_HEIGHT: 47
    };


    var SetHintPosition_VM = Parse.View.extend({
      tagName: 'div',
      id: '#container',
      model: new Hint(),
      events: {
        "touchend #set-point-btn": "setGeoPoint"
      },

      template: Handlebars.compile(template),
      initialize: function () {
        this.loading = new LoadingView();
        this.flagEvent = false;
        this.model.id = this.options.hintIdToGet;
        this.model.on('HintForm_VM_HINTSYNC', this.setFlagEventListener, this);
        //Callback on Geopoint saved on Parse
        this.model.on('SetHintPosition_VM_POINTUPDATED', this.setGeoPointCallback, this);
        this.model.fetchFromP();
      },

      render: function (eventName) {
        var header = new Header_VS();
        var title = "Select Point for Hint #" + this.model.attributes.number;
        //$(this.el).html(header.render({'title': title}).el).append("string");
        $(this.el).html(header.render({'title': title}).el).append(this.template());
        if (this.flagEvent) {
          this.renderMap();
        }
        return this;
      },

      renderMap: function () {
        var self = this;
        var t = setTimeout(function () {
          var position = self.model.attributes.point;

          /* creates the map object */
          self.map = L.map(self.$('#map')[0]);

          /* creates the actual map layer (still without a real map though) and adds it to the map */
          L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
            //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }).addTo(self.map);

          /* checks if there's a point saved on the model:
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
                self.map.setView([currPosition.latitude, currPosition.longitude], 15);
                self.createViewfinder();
              },
              // error
              null,
              // options
              {enableHighAccuracy: true, timeout: 20000}
            );
          }

        }, 1000);
      },

      createViewfinder: function () {
        /* creates the center of the viewfinder and adds it to the map */
        this.viewfinderCenter = L.circle(this.map.getCenter(), ks.VIEWFINDER_INT_RADIUS, {
          stroke: false,
          fill: true,
          fillColor: '#222',
          fillOpacity: 1,
          clickable: false
        }).addTo(this.map);

        /* creates the external circle of the viewfinder and adds it to the map */
        this.viewfinder = L.circle(this.map.getCenter(), ks.VIEWFINDER_EXT_RADIUS, {
          color: '#555',      // color of the stroke
          weight: 2,          // width of the stroke radius
          fill: true,         // whether the circle is filled
          fillColor: '#555',
          fillOpacity: 0.2,
          clickable: false
        }).addTo(this.map);

        /* relocates the viewfinder to the current center of the map */
        var self = this;
        this.map.on('drag', function (e) {
          self.viewfinder.setLatLng(self.map.getCenter());
          self.viewfinderCenter.setLatLng(self.map.getCenter());
        });
      },

      setGeoPoint: function () {
        this.loading.render();
        var currentCenter = this.map.getCenter();

        /* uploading current center to Parse */
        var parseCurrentCenter = new Parse.GeoPoint(currentCenter.lat, currentCenter.lng);
        this.model.attributes.point = parseCurrentCenter;
        this.model.updateGeoPoint(parseCurrentCenter);

        this.setMarkerFromPoint(parseCurrentCenter);
      },

      setFlagEventListener: function () {
        this.flagEvent = true;
        this.render();
      },

      setMarkerFromPoint: function (point) {
        if (this.pin) {
          this.map.removeLayer(this.pin);
        }

        var pinIcon = new L.Icon({
          iconUrl: '/res/img/pin-with-shadow.png',            // absolute URL
          iconSize: new L.Point(ks.PIN_WIDTH, ks.PIN_HEIGHT), // in px
          iconAnchor: new L.Point(20, 10),                    // in px, offset from the center of the icon
        });

        /* creates the pin and adds it to the map */
        this.pin = L.marker([point.latitude, point.longitude], {
          icon: pinIcon
        }).addTo(this.map);
      },

      setGeoPointCallback: function () {
        this.loading.remove();
      }

    });
    return SetHintPosition_VM;
  });