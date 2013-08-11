/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "moment",
  "text!templates/sub/item/wall-TSI.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    moment,
    template
  ) {

    var Wall_VSI = Parse.View.extend({

        tagName: "li",

        events: {
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
        },

        writeTheWallMessage: function() {
          if (this.model.attributes.messageType == 0) {
            return " ha trovato l'hint N."+this.model.attributes.hintNumber;
          } else if (this.model.attributes.messageType == 1) {
            return " si e' aggiunto alla partita.";
          } else if (this.model.attributes.messageType == 2) {
            return " ha creato la partita.";
          } else if (this.model.attributes.messageType == 3) {
            return " dice: "+this.model.attributes.messageText;
          } else if (this.model.attributes.messageType == 4) {
            return "Ancora nessuno ha trovato l'hint.";
          }
        },

        render: function (eventName) {
          var timeFromNow = moment(this.model.createdAt).fromNow();
          var wallMsg = {time: timeFromNow, text: this.writeTheWallMessage(), username: this.model.attributes.username};
          $(this.el).html(this.template(wallMsg));
          $("#overlay-loading").fadeOut();
          return this;
        }

      });

    return Wall_VSI;

  });