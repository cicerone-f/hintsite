/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/Header_VS",
  "views/sub/list/Wall_VSL",
  "text!templates/main/wall-full.html",
  "models/WallMessage"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Header_VS,
    Wall_VSL,
    template,
    WallMessage
  ) {

    var WallFull_VM = Parse.View.extend({
      tagName: "div",
      id: "container",
      template: Handlebars.compile(template),
      initialize: function () {
      },

      events: {
        "click #inviaMessage": "sendMessage"
      },

      sendMessage: function () {
        if ($.trim($("#textMessage").val()) != "") {
          var wallMsg = new WallMessage();
          wallMsg.on('savedTextMsg', this.render, this);
          wallMsg.saveTextToP(wallMsg.messageTypes.TEXT_MESSAGE, this.options.matchId, $("#textMessage").val());
        }
      },

      render: function (eventName) {
        var header = new Header_VS({owner: "WallFull_VM", backViewModelId: this.options.matchId});
        $(this.el).html(header.render().el)
        .append(new Wall_VSL({matchId: this.options.matchId}).render().el)
        .append(this.template());
        return this;
      }
    });

  return WallFull_VM;

  });