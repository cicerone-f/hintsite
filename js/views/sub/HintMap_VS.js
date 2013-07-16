/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Hint",
  "models/Pms",
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
    Pms,
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
      pms: Pms,
      events: {
        "click #check-in-btn": "checkIn"
      },

      template: Handlebars.compile(template),

      initialize: function () {
        this.model = new Hint();
        this.loading = new LoadingView();
        this.model.on('HintMap_VS_HINTFORPLACE', this.unrenderLoading, this);
        this.matchId = this.options.matchId;
        this.pms = new Pms();
        this.pms.id = this.options.pms.id;
        if(this.pms.id)
          this.pms.fetchFromP();
        this.pms.on("hintPlusplussed",this.notify,this);
        if (this.options.pms.attributes.myHint){
          this.model.getWithPmsAndMatch(this.options.pms.attributes.myHint, this.matchId);
          this.loading.render();
        }  
      },

      //unrenderloading deve partire quando arrivano sia porcoiddio che HintMap_VS_HINTFORPLACE

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
              self.pms.plusPlusMyHint(Parse.User.current().id , this.matchId);
            }else{
              navigator.notification.alert('Errato! '+  point.kilometersTo(self.model.attributes.point) );
            }
          },
          // error
          null,
          // options
          {enableHighAccuracy: true, timeout: 20000}
        );

      },

      notify: function () {
        console.log("notify");
        navigator.notification.alert(
          'Hint completed!',  // message
          this.alertDismissed,         // callback
          'Well Done !!',            // title
          'OK'                  // buttonName
        );
      },

      alertDismissed: function () {
//        Parse.history.navigate("matches/" + this.matchId, {trigger: true});// non funziona non so perche
        Parse.history.navigate("" , {trigger: true});

      },

      unrenderLoading: function () {
        this.loading.remove();
      }

    });
    return HintMap_VS;
  });