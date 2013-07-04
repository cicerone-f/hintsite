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
  "text!templates/sub/hint-map-TS.html"
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


    var HintMap_VS = Parse.View.extend({
      tagName: 'div',
      id: 'container',
      model: Hint,
      events: {
        /* a click on the "Set Point" button */
        "click #check-in-btn": "checkIn"
      },

      template: Handlebars.compile(template),

      initialize: function () {
        this.model = new Hint();
        this.loading = new LoadingView();
        this.matchId = this.options.matchId;
        this.pms = this.options.pms;
        //this.model.fetchFromP();
      },

      render: function (eventName) {
        $(this.el).html(this.template());
        this.renderMap();
        return this;
      },

      renderMap: function () {
        var self = this;
        var t = setTimeout(function () {
          var position = self.model.attributes.point;

          /* creates the map object */
          self.map = L.map(self.$('#map')[0],{ zoomControl:false , dragging:false });

          /* creates the actual map layer (still without a real map though) and adds it to the map */
          L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
            minZoom: 14,
            maxZoom: 14
          }).addTo(self.map);

          /* 
            checks if there's a point saved on the model:
            if there is one, centers the map on that point and adds the marker on that point;
            if there isn't, centers the map on the current location (taken from Cordova) and
            doesn't place any viewfinder;
          */
          var modelPoint = self.model.attributes.point;
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
        }, 1000);
      },

      panToCurrentPosition: function () {
        var self = this;
        navigator.geolocation.getCurrentPosition(
          // success
          function (currPosition) {
            self.map.panTo([currPosition.coords.latitude, currPosition.coords.longitude]);
          },
          // error
          null,
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

      checkIn: function () {
        // this.loading.render();
        // var currentCenter = this.map.getCenter();

        // /* uploading current center to Parse */
        // var parseCurrentCenter = new Parse.GeoPoint(currentCenter.lat, currentCenter.lng);
        // this.model.attributes.point = parseCurrentCenter;
        // this.model.updateGeoPoint(parseCurrentCenter);

        // this.setMarkerFromPoint(parseCurrentCenter);

        console.log(this.matchId);
        console.log(this.pms);
      },

      setGeoPointCallback: function () {
        this.loading.remove();
      }

    });
    return HintMap_VS;
  });