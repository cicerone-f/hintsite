/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "models/Hint",
  "views/sub/list/HintPreview_VSL",
  "views/sub/Header_VS",
  "views/main/AcceptMatch_VM",
  "views/main/ListingGiocatori_VM",
  "views/sub/HintMap_VS",
  "views/sub/list/Wall_VSL",
  "text!templates/main/partita-master.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Pms,
      Hint,
      HintPreview_VSL,
      Header_VS,
      AcceptMatch_VM,
      ListingGiocatori_VM,
      HintMap_VS,
      Wall_VSL,
      template
    ) {

    var PartitaMaster_VM = Parse.View.extend({
        tagName: "div",
        id: "container",
        template: Handlebars.compile(template),
        initialize: function () {
          this.hint = new Hint();
          this.hint.on("HintMap_VS_HINTFORPLACE",this.go,this);
          this.Pms = new Pms();
          var query = new Parse.Query(Pms);
          query.equalTo("matchId", this.model.id);
          query.equalTo("userId", Parse.User.current().id);
          var self = this;
          query.find({
            success: function (results) {
              self.Pms = results[0];
              self.render();
              $("#overlay-loading").fadeOut();
            },
            error: function (error){
              console.error(error);
            }
          });
        },
        events: {
          "click #listing-giocatori": "renderListing",
          "click #hint-full-1": "goToHintFull1",
          "click #hint-full-2": "goToHintFull2",
          "click #hint-full-3": "goToHintFull3",
          "click #hint-full-4": "goToHintFull4"
        },

        renderListing: function (eventName) {
          $("#overlay-loading").fadeIn();
          var lg = new ListingGiocatori_VM({matchId: this.model.id});
          $(this.el).append(lg.render().el);
          return this;
        },

        render: function (eventName) {
          var header = new Header_VS({owner: "PartitaMaster_VM",backViewModelId:0});
          $(this.el).html(header.render().el).append(this.template())
            .append( new Wall_VSL({matchId: this.model.id}).render().el );
          return this;
        },
        go: function () {
          $("#overlay-loading").fadeIn();          
          Parse.history.navigate("hints/" + this.hint.id, {trigger: true});
        },

        goToHintFull1: function () {
          this.hint.getWithNumberAndMatch(1,this.model.id); 
        },

        goToHintFull2: function () {
          this.hint.getWithNumberAndMatch(2,this.model.id); 
        },
        
        goToHintFull3: function () {
          this.hint.getWithNumberAndMatch(3,this.model.id); 
        },
        
        goToHintFull4: function () {
          this.hint.getWithNumberAndMatch(4,this.model.id); 
        }
      });

    return PartitaMaster_VM;

  });