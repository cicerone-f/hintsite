define(["jquery", "underscore", "backbone", "handlebars", "views/HintListItemView", "text!templates/hint-list.html"],
    function ($, _, Backbone, Handlebars, HintListItemView, template) {

    var HintListView = Backbone.View.extend({

        tagName: "ul",
        id: "list",

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.model.models, function (hint) {
            $(this.el).append(new HintListItemView({
              model: hint
            }).render().el);
          }, this);
          return this;
        }
      });

    return HintListView;

  });