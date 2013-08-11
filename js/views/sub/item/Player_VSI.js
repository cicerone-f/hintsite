/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/UserSearched",
  "models/Pms",
  "text!templates/sub/item/player-TSI.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    UserSearched,
    Pms,
    template
  ) {

    var Player_VSI = Parse.View.extend({

        tagName: "li",
        model: Pms,
        player: UserSearched,
        events: {
          "click": "goToEdit"
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.player = new UserSearched();
          this.player.id = this.model.attributes.userId;
          this.player.getFromParseId();
          this.player.bind("change", this.render, this);
          this.player.on("PmsEdit_VSI_USERFOUND", this.render, this);
          this.player.bind("destroy", this.close, this);
        },

        render: function (eventName) {
          $(this.el).html(this.template(this.player.toJSON()));
          $("#overlay-loading").fadeOut();
          return this;
        },

        goToEdit: function () {

        }
      });

    return Player_VSI;

  });