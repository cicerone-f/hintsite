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
          var viewContent = new vsHeader().render({title:"Partita Player"}).el;
          $(this.el).html(viewContent).append(this.template(this.model.toJSON()));
          $(this.el).append(new vslHintPreview({
            model: this.model
          }).render().el);
          return this;
        }
      });

    return vmPartitaPlayer;

  });