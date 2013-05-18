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
        "touchend #setPoint": "setGeoPoint"
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
          if (this.model.attributes.point) {
            this.renderMap();
          } else {
            // condition "if (this.model.createdAt)" needed to know if is the router render
            // or if is the render after 'HintForm_VM_HINTSYNC' event trigger
            var self = this;
            navigator.geolocation.getCurrentPosition(
              function (position) {
                self.setGeoPointFromGPS(position);
              },
              null
            );
          }
        }
        return this;
      },

      renderMap: function () {
        var self = this;
        var t = setTimeout(function () {
          var position = self.model.attributes.point;
          self.map = L.map(self.$('#map')[0]).setView([position.latitude, position.longitude], 15);
          L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }).addTo(self.map);

          /* creates the center of the viewfinder and add it to the map */
          self.viewfinderCenter = L.circle(self.map.getCenter(), ks.VIEWFINDER_INT_RADIUS, {
            stroke: false,
            fill: true,
            fillColor: '#222',
            fillOpacity: 1,
            clickable: false
          }).addTo(self.map);

          /* creates the external circle of the viewfinder and add it to the map */
          self.viewfinder = L.circle(self.map.getCenter(), ks.VIEWFINDER_EXT_RADIUS, {
            color: '#555',      // color of the stroke
            weight: 2,          // width of the stroke radius
            fill: true,         // whether the circle is filled
            fillColor: '#555',
            fillOpacity: 0.2,
            clickable: false
          }).addTo(self.map);

          /* relocates the viewfinder to the current center of the map */
          self.map.on('drag', function (e) {
            self.viewfinder.setLatLng(self.map.getCenter());
            self.viewfinderCenter.setLatLng(self.map.getCenter());
          });

        }, 1000);
      },

      setGeoPoint: function () {
        this.loading.render();
        var currentCenter = this.map.getCenter();
        var parseCurrentCenter = new Parse.GeoPoint(currentCenter.lat, currentCenter.lng);
        this.model.updateGeoPoint(parseCurrentCenter);
      },

      setGeoPointFromGPS: function (position) {
        var newPosition = new Parse.GeoPoint(position.coords.latitude, position.coords.longitude);
        this.model.attributes.point = newPosition;
        this.renderMap();
      },

      setFlagEventListener: function () {
        this.flagEvent = true;
        this.render();
      },

      // the 'pin' variable in this function is a L.marker object
      setMarkerFromPoint: function (point) {
        // this.loading.remove();
        if (this.pin) {
          this.map.removeLayer(this.pin);
        }

        var pinIcon = new L.Icon({
          iconUrl: '/res/img/pin-with-shadow.png',                      // absolute URL
          iconSize: new L.Point(ks.PIN_WIDTH, ks.PIN_HEIGHT),   // in px
          iconAnchor: new L.Point(20, 10),                              // in px, offset from the center of the icon
        });

        this.pin = L.marker([point.latitude, point.longitude], {
          icon: pinIcon
        });
        this.pin.addTo(this.map);
      },

      setGeoPointCallback: function () {
        this.loading.remove();
        if (this.pin) {
          this.map.removeLayer(this.pin);
        }

        var pinIcon = new L.Icon({
          iconUrl: '/res/img/pin-with-shadow.png',                      // absolute URL
          iconSize: new L.Point(ks.PIN_WIDTH, ks.PIN_HEIGHT),   // in px
          iconAnchor: new L.Point(20, 10),                              // in px, offset from the center of the icon
        });

        var coords = [this.model.attributes.point.latitude, this.model.attributes.point.longitude];
        this.pin = L.marker(coords, {
          draggable: true,
          icon: pinIcon
        });
        this.pin.addTo(this.map);

        var self = this;
        this.pin.on('dragend', function (e) {
          var newLat = self.pin.getLatLng();
          self.pin.setLatLng(newLat);
        });
      }

    });
    return SetHintPosition_VM;
  });