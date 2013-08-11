/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/loading.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {

    var LoadingView = Parse.View.extend({
        tagName: 'div',
        template: Handlebars.compile(template),
        initialize: function () {
          console.log("newloaading");
        },
        render: function (eventName) {
          console.log("renderloaading");
          $(this.el).html(this.template);
          $('body').append($(this.el));
          return this;
        }
      });

    return LoadingView;

  });