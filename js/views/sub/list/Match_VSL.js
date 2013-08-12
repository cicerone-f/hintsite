/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/Match_VSI",
  "collections/PmsCollection",
  "models/Pms",
  "text!templates/sub/list/match-TSL.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Match_VSI,
      PmsCollection,
      Pms,
      template
    ) {

    var Match_VSL = Parse.View.extend({

        tagName: "ul",
        id: "list",
        collection: PmsCollection,
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection.bind("add", this.render, this);

        },

        render: function (eventName) {
          var title;
          $(this.el).empty();
          if ((this.options.matchType == 'inCorsoMaster') || (this.options.matchType == 'sospeseMaster')  || (this.options.matchType == 'storicoMaster')) {
            title = {title: 'master'};
          } else if ((this.options.matchType == 'inCorsoPlayer') || (this.options.matchType == 'sospesePlayer')  || (this.options.matchType == 'storicoPlayer')) {
            title = {title: 'player'};
          } else {
            title = {title: 'pubbliche'};
          }
          var counter = 0;
          $(this.el).html(this.template(title));
          _.each(this.collection.models, function (pms) {
            $(this.el).append(new Match_VSI({
              model: pms,
              matchType: this.options.matchType,
              backgroundEven: counter
            }).render().el);
            counter++;
          }, this);
          if(this.options.matchType == 'publicMatch'){
            $("#overlay-loading").fadeOut();
          }
          return this;
        }
      });

    return Match_VSL;

  });