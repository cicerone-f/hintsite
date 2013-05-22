/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/item/hint-edit-TSI.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {

    var HintEdit_VSI = Parse.View.extend({

        tagName: "li",

        events: {
          "touchend": "goToEdit"
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

        goToEdit: function () {
          Parse.history.navigate("hintsedit/" + this.model.id, {trigger: true});
        }
      });

    return HintEdit_VSI;

  });