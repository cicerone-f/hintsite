/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/UserSearched",
  "text!templates/sub/item/pms-edit-TSI.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    UserSearched,
    template
  ) {

    var PmsEdit_VSI = Parse.View.extend({

        tagName: "li",
        PmsUser: UserSearched,
        template: Handlebars.compile(template),

        initialize: function () {
          this.PmsUser = new UserSearched();
          this.PmsUser.id = this.model.attributes.userId;
          this.PmsUser.on("PmsEdit_VSI_USERFOUND", this.render, this);
          this.model.bind("change", this.getUserFromPms, this);
          this.model.bind("destroy", this.close, this);
          this.PmsUser.getFromParseId();
        },

        getUserFromPms: function () {
          console.log('aaaa');
          this.PmsUser.getFromParseId(this.model.attributes.userId);
        },

        render: function (eventName) {
          var pms = this.PmsUser.toJSON();
          $(this.el).html(this.template(pms));
          return this;
        }
      });

    return PmsEdit_VSI;

  });