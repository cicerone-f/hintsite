/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/generic-popup.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {
    var Popup_VM = Parse.View.extend({
        id: 'generic-popup-container',
        template: Handlebars.compile(template),

        events: {
          "click #close" : "unrender"        },

        initialize: function () {
          this.notification = this.options.notificationText;
        },

        render: function (eventName) {
          $(this.el).html(this.template({message: this.notification}));
          return this;
        },

        unrender: function() {
          this.remove();
        }

      });
    return Popup_VM;
  });