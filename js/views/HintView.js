define(["jquery", "underscore", "backbone", "handlebars", "text!templates/hint-details.html"],
    function ($, _, Backbone, Handlebars, template) {

    var HintView = Backbone.View.extend({

        events: {
          "touchend #back": "goBack"
        },

        goBack: function () {
          window.history.back();
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        }
      });

    return HintView;

  });