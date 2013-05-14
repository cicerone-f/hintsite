/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/vslHintPreview",
  "views/sub/vsHeader",
  "text!templates/match-details.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      vslHintPreview,
      vsHeader,
      template
    ) {

    var vmPartitaPlayer = Parse.View.extend({
        tagName: "div",
        id: "container",
        template: Handlebars.compile(template),

        render: function (eventName) {
          var header = new vsHeader();
          $(this.el)
            .html(header.render({title: header.titles.vmPartitaPlayer}).el)
            .append(this.template(this.model.toJSON()));

          $(this.el).append(new vslHintPreview({
            model: this.model
          }).render().el);

          return this;
        }
      });

    return vmPartitaPlayer;

  });