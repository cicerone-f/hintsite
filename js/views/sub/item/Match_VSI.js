/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Match",
  "text!templates/sub/item/match-TSI.html"
],
    function ($, _, Backbone, Parse, Handlebars, Match, template) {

    var Match_VSI = Parse.View.extend({

        tagName: "li",

        events: {
          "click": "goToDetails"
        },

        template: Handlebars.compile(template),
        match: Match,

        initialize: function () {
          this.match = new Match();
          this.match.id = this.model.attributes.matchId;
          this.match.on("Match_VSI_MATCHSYNC", this.render, this);
          this.model.bind("change", this.getMatchFromPms, this);
          this.model.bind("destroy", this.close, this);
          this.match.fetchFromP("Match_VSI");
        },

        getMatchFromPms: function (){
          this.match.fetchFromP("Match_VSI");
        },

        render: function (eventName) {
          var match = this.match.toJSON();
          match.id = this.match.id;
          $(this.el).html(this.template(match));
          return this;
        },

        goToDetails: function () {
          if (this.model.attributes.state == 0) {
            Parse.history.navigate("editMatch/" + this.model.id, {trigger: true});
          } else if (this.model.attributes.state == 1) {
            Parse.history.navigate("matches/" + this.model.id, {trigger: true});
          }
          
        }
      });

    return Match_VSI;

  });