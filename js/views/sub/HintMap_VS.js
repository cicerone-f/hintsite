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
  "models/UserSearched",
  "views/sub/Header_VS",
  "views/main/Popup_VM",
  "views/main/Arrow_VM",
  "views/main/ListingGiocatori_VM",  
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
    UserSearched,
    Header_VS,
    Popup_VM,
    Arrow_VM,
    ListingGiocatori_VM,
    leaflet,
    template
  ) {

    var HintMap_VS = Parse.View.extend({
      tagName: 'div',
      id: "map-container",
      model: Hint,
      pms: Pms,
      events: {
        "click #check-in-btn": "checkIn",
        "click #go-to-wall": "goToWall",
        "click #go-to-players": "renderListing",        
        "click #distance": "checkGetHintDistance",
        "click #direction": "checkGetHintDirection"
      },

      template: Handlebars.compile(template),

      initialize: function () {
        this.loadingCount = 0;
        this.model = new Hint();
        this.model.on('HintMap_VS_HINTFORPLACE', this.unrenderLoadingAvvio, this);
        this.matchId = this.options.matchId;
        this.pms = new Pms();
        this.pms.id = this.options.pms.id;
        if(this.pms.id)
          this.pms.fetchFromP();
        this.pms.on("hintPlusplussed", this.notify, this);
        this.pms.on("gettedMyPms", this.unrenderLoadingAvvio,this);
        this.pms.on("HintMap_VS_UsedHelpDistance", this.getHintDistance, this);
        this.pms.on("HintMap_VS_UsedHelpDirection", this.getHintDirection, this);
        if (this.options.pms.attributes.myHint){
          this.model.getWithNumberAndMatch(this.options.pms.attributes.myHint, this.matchId);
                      $("#overlay-loading").fadeIn();
        }  
      },

      //unrenderloading deve partire quando arrivano sia porcoiddio che HintMap_VS_HINTFORPLACE

      render: function (eventName) {
        $(this.el).html(this.template());
        return this;
      },
      
      foo : function () {
        console.log(this.pms.attributes.matchId);
      },
      
      goToWall: function () {
        $("#overlay-loading").fadeIn();
        Parse.history.navigate("wallFull/"+this.matchId , {trigger: true});
      },

      renderListing: function (eventName) {
        $("#overlay-loading").fadeIn();
        var lg = new ListingGiocatori_VM({matchId: this.matchId});
        $(this.el).append(lg.render().el);
        return this;
      },

      renderMap: function () {
        var self = this;
          var position = self.model.attributes.point;

          /* creates the map object */
          if (!self.map){
            self.map = L.map(self.$('#map')[0],{ zoomControl:false , dragging:false });
            L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
              minZoom: 15,
              maxZoom: 15
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
        $("#overlay-loading").fadeIn();
        var self = this;
        navigator.geolocation.getCurrentPosition(
          // success
          function (currPosition) {            
            var point = new Parse.GeoPoint(currPosition.coords.latitude, currPosition.coords.longitude);
            if (point.kilometersTo(self.model.attributes.point) <= 0.5){
              self.pms.plusPlusMyHint(Parse.User.current().id, self.pms.attributes.matchId);
              setInterval(function(){$("#overlay-loading").fadeOut();},1000);
            }else{
              var message = "Wrong position for hint!";
              setInterval(function(){$("#overlay-loading").fadeOut();},1000);
              $('body').append( 
                new Popup_VM({
                  notificationText: message
                }).render().el
              );
            }
          },
          // error
          null,
          // options
          {enableHighAccuracy: true, timeout: 20000}
        );

      },

      checkGetHintDistance: function () {
        if (!(this.pms.attributes.UsedHelpDistance)) {
          this.pms.saveUsedHelpDistance();
        } else {
          var message = "You've already use this Help in this Match!";
          $('body').append( 
            new Popup_VM({
              notificationText: message
            }).render().el
          );
        }
      },

      getHintDistance: function () {
          var self = this;
          navigator.geolocation.getCurrentPosition(
            // success
            function (currPosition) {            
              var point = new Parse.GeoPoint(currPosition.coords.latitude, currPosition.coords.longitude);
              var distance = "You're " + point.kilometersTo(self.model.attributes.point).toFixed(3) + " Km far from Hint";
              $('body').append( 
                new Popup_VM({
                  notificationText: distance
                }).render().el
              );  
            },
            // error
            null,
            // options
            {enableHighAccuracy: true, timeout: 20000}
          );  
      },

      checkGetHintDirection: function () {
        if (!(this.pms.attributes.UsedHelpDirection)) {
          this.pms.saveUsedHelpDirection();
        } else {
          var message = "You've already use this Help in this Match!";
          $('body').append( 
            new Popup_VM({
              notificationText: message
            }).render().el
          );
        }
      },

      getHintDirection: function () {
        var self = this;
        navigator.geolocation.getCurrentPosition(
          // success
          function (currPosition) {            
            var point = new Parse.GeoPoint(currPosition.coords.latitude, currPosition.coords.longitude);
            var angle = Math.atan( ( currPosition.coords.longitude - self.model.attributes.point.longitude ) / ( currPosition.coords.latitude - self.model.attributes.point.latitude )) * (180 / Math.PI);
            var distance = angle.toFixed(0);
            $('body').append( 
              new Arrow_VM({
                angle: distance
              }).render().el
            );  
          },
          // error
          null,
          // options
          {enableHighAccuracy: true, timeout: 20000}
        );
      },

      notify: function () {
        this.addPointsToUser(200);
        Parse.history.navigate("hintFound/" + this.matchId, {trigger: true});
      },

      addPointsToUser: function (pt) {
        var user = new UserSearched();
        user.addPoints(pt);
      },

      unrenderLoadingAvvio: function () {
        this.loadingCount++;
        if (this.loadingCount==2){
          this.renderMap();
          $("#overlay-loading").fadeOut();
        }
      }

    });
    return HintMap_VS;
  });