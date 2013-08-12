/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "moment",
  "models/Match",
  "text!templates/sub/item/match-TSI.html"
],
    function ($, _, Backbone, Parse, Handlebars, moment, Match, template) {

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
          if ((this.options.matchType == 'inCorsoMaster') || (this.options.matchType == 'sospeseMaster')) {
            this.matchTypeIcon = 'master';
          } else {
            this.matchTypeIcon = 'user';
          }
        },

        getMatchFromPms: function (){
          this.match.fetchFromP("Match_VSI");
        },

        render: function (eventName) {
          var timeFromNow = moment(this.model.updatedAt).fromNow();
          var match = this.match.toJSON();
          match.id = this.match.id;
          if ($.trim(match.name) === '') {
            match.name = "(untitled)";
          }
          $(this.el).html(this.template({name: match.name, time: timeFromNow, icon: this.matchTypeIcon}));
          if (this.options.backgroundEven % 2) {
            $(this.el).addClass('odd');
          } else {
            $(this.el).addClass('even');
          }
          return this;
        },

        goToDetails: function () {
          if (this.options.matchType == 'inCorsoMaster') {
            $("#overlay-loading").fadeIn();
            Parse.history.navigate("matchesMaster/" + this.model.attributes.matchId, {trigger: true});
          } else if (this.options.matchType == 'sospeseMaster') {
            $("#overlay-loading").fadeIn();            
            Parse.history.navigate("editMatch/" + this.model.attributes.matchId, {trigger: true});
          } else if (this.options.matchType == 'inCorsoPlayer') {
            $("#overlay-loading").fadeIn();
            Parse.history.navigate("matches/" + this.model.attributes.matchId, {trigger: true});
          } else if (this.options.matchType == 'sospesePlayer') {
            $("#overlay-loading").fadeIn();
            Parse.history.navigate("matches/" + this.model.attributes.matchId + "/" + this.options.matchType, {trigger: true});
          }
          
        }
      });

    return Match_VSI;

  });