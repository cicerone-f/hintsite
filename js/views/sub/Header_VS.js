/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/header-TS.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      template
    ) {

    var Header_VS = Parse.View.extend({
        tagName: "div",
        id: "header",
        template: Handlebars.compile(template),
        events: {
          "click #back": "goBack"
        },
        goBack: function () {
          $("#overlay-loading").fadeIn();
          Parse.history.navigate('back/'+this.options.owner+"/"+this.options.backViewModelId, { trigger : true, replace : true });
        },
        initialize: function () {
        },
        render: function () {
          $(this.el).empty();
          $(this.el).html(
            this.template({
              title:this.options.owner
              }
            )
          );
          return this;
        }
      });

    return Header_VS;

  });