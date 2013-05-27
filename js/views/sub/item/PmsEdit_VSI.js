/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/item/pms-edit-TSI.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {

    var PmsEdit_VSI = Parse.View.extend({

        tagName: "li",

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
          var pms = this.model.toJSON();
          pms.cid = this.model.id;
          $(this.el).html(this.template(pms));
          return this;
        }
      });

    return PmsEdit_VSI;

  });