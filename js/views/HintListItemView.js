define(["jquery", "underscore", "backbone", "Parse", "handlebars", "text!../templates/hint-list-item.html"],
    function ($, _, Backbone, Parse, Handlebars, template) {

    var HintListItemView = Parse.View.extend({

        tagName: "li",

        events: {
          "touchend": "goToDetails"
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
          var hint = this.model.toJSON();
          hint.cid = this.model.id;
          $(this.el).html(this.template(hint));
          return this;
        },

        goToDetails: function () {
          Parse.history.navigate("hints/" + this.model.id, {trigger: true});
        }
      });

    return HintListItemView;

  });