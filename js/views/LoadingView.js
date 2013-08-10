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
        className: 'loading',
        template: Handlebars.compile(template),
        initialize: function () {
          console.log("initloading");
        },
        render: function (eventName) {
          $(this.el).html(this.template);
          $('body').append($(this.el));
          console.log("renderloading");
          return this;
        }
      });

    return LoadingView;

  });