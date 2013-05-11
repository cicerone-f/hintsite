/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/HintListView",
  "text!templates/match-details.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      HintListView,
      template
    ) {

    var MatchView = Parse.View.extend({

        events: {
          "touchend #back": "goBack"
        },

        goBack: function () {
          if (Parse.history.routesHit > 1) {
            //more than one route hit -> user did not land to current page directly
            window.history.back();
          } else {
            //otherwise go to the home page. Use replaceState if available so
            //the navigation doesn't create an extra history entry
            Parse.history.navigate('', { trigger : true, replace : true });
          }
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template(this.model.toJSON()));
          $(this.el).append(new HintListView({
            model: this.model
          }).render().el);
          return this;
        }
      });

    return MatchView;

  });