/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/hint-details.html",
  "views/sub/Header_VS",
  "views/sub/list/Wall_VSL"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template,
    Header_VS
  ) {

    var WallFull_VM = Parse.View.extend({

        template: Handlebars.compile(template),

        render: function (eventName) {
          var header = new Header_VS();
          $(this.el).html(header.render().el)
          .append(new Wall_VSL().render().el)
          return this;
        }
      });

    return WallFull_VM;

  });