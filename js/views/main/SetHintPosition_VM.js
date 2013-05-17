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
    leaflet,
    template
  ) {
    var SetHintPosition_VM = Parse.View.extend({
      tagName: 'div',
      id: '#container',
      model: new Hint(),
      events: {
        "touchend #setPoint": "setGeoPoint"
      },

      template: Handlebars.compile(template),
      initialize: function () {
        this.model.id = this.options.hintIdToGet;
        this.model.on('HintForm_VM_HINTSYNC', this.render, this);
        //Callback on Geopoint saved on Parse
        //this.model.on('SetHintPosition_VM_POINTUPDATED', null, this);
        this.model.fetchFromP();
      },

      render: function (eventName) {
        var header = new Header_VS();
        var title = "MAPPA";
        //$(this.el).html(header.render({'title': title}).el).append("string");
        $(this.el).html(header.render({'title': title}).el).append(this.template());
        if (this.model.attributes.point) {
          this.renderMap();
        } else if (this.model.createdAt) {
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
        return this;
      },

      renderMap: function () {
        var self = this;
        var t = setTimeout(function () {
          var position = self.model.attributes.point;
          self.map = L.map(self.$('#map')[0]).setView([position.latitude, position.longitude], 10);
          L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }).addTo(self.map);
        }, 1000);
      },

      setGeoPoint: function () {
        var currentCenter = this.map.getCenter();
        var parseCurrentCenter = new Parse.GeoPoint(currentCenter.lat, currentCenter.lng);
        this.model.updateGeoPoint(parseCurrentCenter);
      },

      setGeoPointFromGPS: function (position) {
        var newPosition = new Parse.GeoPoint(position.coords.latitude, position.coords.longitude);
        this.model.attributes.point = newPosition;
        this.renderMap();
      }

    });
    return SetHintPosition_VM;
  });