/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
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
          this.Pms = new Pms();
          var query = new Parse.Query(Pms);
          query.equalTo("matchId", this.model.id);
          query.equalTo("userId", Parse.User.current().id);
          var self = this;
          query.find({
            success: function (results) {
              self.Pms = results[0];
              self.render();
            },
            error: function (error){
              console.log(error);
            }
          });
        },
        events: {
          "click #listing-giocatori": "renderListing",
          "click #hint-full": "goToHintFull"
        },

        renderListing: function (eventName) {
          var lg = new ListingGiocatori_VM({matchId: this.model.id});
          $(this.el).append(lg.render().el);
          return this;
        },

        goToHintFull: function () {
          console.log("goToHintFull");
        },

        render: function (eventName) {
          var header = new Header_VS({owner: "PartitaMaster_VM",backViewModelId:0});
          $(this.el).html(header.render().el).append(this.template())
            .append( new Wall_VSL({matchId: this.model.id}).render().el );
          return this;
        }
      });

    return PartitaMaster_VM;

  });