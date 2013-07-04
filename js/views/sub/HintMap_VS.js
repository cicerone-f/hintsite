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
        "click #check-in-btn": "checkIn"
      },

      template: Handlebars.compile(template),

      initialize: function () {
        this.model = new Hint();
        this.loading = new LoadingView();
        this.model.on('HintMap_VS_HINTFORPLACE', this.unrenderLoading, this);
        this.matchId = this.options.matchId;
        this.pms = this.options.pms;
        if (this.options.pms.attributes.myHint){
          this.model.getWithPmsAndMatch(this.options.pms.attributes.myHint, this.matchId);
          this.loading.render();
        }  
      },

      render: function (eventName) {
        $(this.el).html(this.template());
        this.renderMap();
        return this;
      },

      renderMap: function () {
        var self = this;
        var t = setInterval(function () {
          var position = self.model.attributes.point;

          /* creates the map object */
          if (!self.map){
            self.map = L.map(self.$('#map')[0],{ zoomControl:false , dragging:false });
            L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
              minZoom: 14,
              maxZoom: 14
            }).addTo(self.map);
          }
          var modelPoint = self.model.attributes.point;
          navigator.geolocation.getCurrentPosition(
            // success
            function (currPosition) {
              self.map.setView([currPosition.coords.latitude, currPosition.coords.longitude], 15);
            },
            // error
            null,
            // options
            {enableHighAccuracy: true, timeout: 20000}
          );
        }, 5000);
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

      checkIn: function () {
        // this.loading.render();
        var self = this;
        navigator.geolocation.getCurrentPosition(
          // success
          function (currPosition) {            
            var point = new Parse.GeoPoint(currPosition.coords.latitude, currPosition.coords.longitude);
            if (point.kilometersTo(self.model.attributes.point) <= 0.5){
              console.log("corretto");
            }else{
              console.log("errato");
            }
          },
          // error
          null,
          // options
          {enableHighAccuracy: true, timeout: 20000}
        );

      },

      unrenderLoading: function () {
        this.loading.remove();
        console.log(this.model);
      }

    });
    return HintMap_VS;
  });