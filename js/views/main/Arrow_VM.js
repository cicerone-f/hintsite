/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/arrow-popup.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {
    var Arrow_VM = Parse.View.extend({
        id: 'arrow-popup-container',
        template: Handlebars.compile(template),

        initialize: function () {
          var self = this;
          this.angle = this.options.angle;
          setTimeout(function () {
            self.rotateArrow();
          }, 1000);
          setTimeout(function () {
            self.unrender();
          }, 7000);
        },

        rotateArrow: function () {
          var animAngle = 1080 + parseInt(this.angle, 10);
          var tempRotation = 'rotate('+ animAngle +'deg)';
          $('#arrow').css({'-webkit-transform': tempRotation});
        },

        render: function (eventName) {
          $(this.el).html(this.template());
          return this;
        },

        unrender: function() {
          this.remove();
        }

      });
    return Arrow_VM;
  });