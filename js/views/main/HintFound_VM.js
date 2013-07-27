/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/hint-found.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {
    var HintFound_VM = Parse.View.extend({
        id: 'container',
        template: Handlebars.compile(template),

        events: {
          "click #next" : "backToMatch"        
        },

        initialize: function () {
          this.matchId = this.options.matchId;
        },

        render: function (eventName) {
          var messageFound = 'Hint Completed! Well done!';
          $(this.el).html(this.template({message: messageFound}));
          return this;
        },

        backToMatch: function () {
          Parse.history.navigate("matches/" + this.matchId, {trigger: true});
        },

        unrender: function() {
          this.remove();
        }

      });
    return HintFound_VM;
  });