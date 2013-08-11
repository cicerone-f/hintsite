/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/item/hint-preview-TSI.html",
  "views/LoadingView",
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template,
    LoadingView
  ) {

    var HintPreview_VSI = Parse.View.extend({

        tagName: "li",

        events: {
          "click #titolone": "goToDetails"
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
          this.loading = new LoadingView();
          this.loading.render();
        },

        render: function (eventName) {
          var hint = this.model.toJSON();
          hint.cid = this.model.id;
          $(this.el).html(this.template(hint));
          return this;
        },

        goToDetails: function () {
          $("#overlay-loading").fadeIn();
          Parse.history.navigate("hints/" + this.model.id, {trigger: true});
        }
      });

    return HintPreview_VSI;

  });