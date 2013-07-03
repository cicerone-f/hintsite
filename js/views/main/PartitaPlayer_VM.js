/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/HintPreview_VSL",
  "views/sub/Header_VS"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      HintPreview_VSL,
      Header_VS
    ) {

    var PartitaPlayer_VM = Parse.View.extend({
        tagName: "div",
        id: "container",

        render: function (eventName) {
          var header = new Header_VS({owner: "PartitaPlayer_VM",backViewModelId:0});

          $(this.el)
            .html(header.render().el)
            .append(new HintPreview_VSL({
              model: this.model
            }).render().el);
          if (this.options.extra) {

          }
          return this;
        }
      });

    return PartitaPlayer_VM;

  });