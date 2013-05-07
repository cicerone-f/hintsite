define(["jquery", "underscore", "backbone", "handlebars", "text!templates/hint-list-item.html"],
    function ($, _, Backbone, Handlebars, template) {

    var HintListItemView = Backbone.View.extend({

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
          hint.cid = this.model.cid;
          $(this.el).html(this.template(hint));
          return this;
        },

        goToDetails: function () {
          Backbone.history.navigate("hints/" + this.model.cid, {trigger: true});
        }
      });

    return HintListItemView;

  });