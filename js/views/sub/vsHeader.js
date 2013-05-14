/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/subview-header.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      template
    ) {

    var vsHeader = Parse.View.extend({
        tagName: "div",
        id: "Header",
        template: Handlebars.compile(template),
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
        initialize: function () {
        },
        render: function (t) {
          console.log(t);
          $(this.el).empty();
          $(this.el).html(this.template(t));
          return this;
        }
      });

    return vsHeader;

  });