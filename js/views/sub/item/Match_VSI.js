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
          if ($.trim(match.name) == "" ) {
            match.name = "(untitled)";
          }
          $(this.el).html(this.template(match));
          return this;
        },

        goToDetails: function () {
          if (this.options.matchType == 'inCorsoMaster') {
            console.log("Match_VSI go to details "+this.model.attributes.matchId);
            Parse.history.navigate("matchesMaster/" + this.model.attributes.matchId, {trigger: true});
          } else if (this.options.matchType == 'sospeseMaster') {
            Parse.history.navigate("editMatch/" + this.model.attributes.matchId, {trigger: true});
          } else if (this.options.matchType == 'inCorsoPlayer') {
            Parse.history.navigate("matches/" + this.model.attributes.matchId, {trigger: true});
          } else if (this.options.matchType == 'sospesePlayer') {
            Parse.history.navigate("matches/" + this.model.attributes.matchId + "/" + this.options.matchType, {trigger: true});
          }
          
        }
      });

    return Match_VSI;

  });