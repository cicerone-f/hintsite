define(["jquery", "underscore", "backbone", "handlebars", "views/AdListItemView", "text!templates/ad-list.html"],
    function ($, _, Backbone, Handlebars, AdListItemView, template) {

    var AdListView = Backbone.View.extend({

        tagName: "ul",
        id: "list",

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.model.models, function (ad) {
            $(this.el).append(new AdListItemView({
              model: ad
            }).render().el);
          }, this);
          return this;
        }
      });

    return AdListView;

  });