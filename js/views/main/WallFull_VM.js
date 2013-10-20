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
        if ($.trim($("#textMessage").val()) !== '') {
          $("#overlay-loading").fadeIn();
          var wallMsg = new WallMessage();
          wallMsg.on('savedTextMsg', this.recCallback, this);
          wallMsg.saveTextToP(wallMsg.messageTypes.TEXT_MESSAGE, this.options.matchId, $("#textMessage").val());
        }
      },

      recCallback: function () {
        $("#overlay-loading").fadeOut();
        this.render();
      },

      render: function (eventName) {
        var header = new Header_VS({owner: "WallFull_VM", backViewModelId: this.options.matchId});
        $(this.el).html(header.render().el)
        .append(this.template())
        .append(new Wall_VSL({matchId: this.options.matchId}).render().el);
        return this;
      }
    });

  return WallFull_VM;

  });