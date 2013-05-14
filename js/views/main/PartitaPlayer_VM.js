/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/HintPreview_VSL",
  "views/sub/Header_VS",
  "text!templates/main/match-details.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      HintPreview_VSL,
      Header_VS,
      template
    ) {

    var PartitaPlayer_VM = Parse.View.extend({
        tagName: "div",
        id: "container",
        template: Handlebars.compile(template),

        render: function (eventName) {
          var header = new Header_VS();
          $(this.el)
            .html(header.render({title: header.titles.PartitaPlayer_VM}).el)
            .append(this.template(this.model.toJSON()));

          $(this.el).append(new HintPreview_VSL({
            model: this.model
          }).render().el);

          return this;
        }
      });

    return PartitaPlayer_VM;

  });