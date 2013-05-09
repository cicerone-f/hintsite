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
          window.history.back();
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