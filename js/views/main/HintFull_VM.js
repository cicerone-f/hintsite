/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/hint-details.html",
  "views/sub/Header_VS",
  "views/sub/list/Wall_VSL"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template,
    Header_VS,
    Wall_VSL
  ) {

    var HintFull_VM = Parse.View.extend({
      tagName: "div",
      id: "container",
      template: Handlebars.compile(template),

      render: function (eventName) {
        var header = new Header_VS({owner: "HintFull_VM",backViewModelId:this.model.attributes.matchId});
        $(this.el).html(header.render().el).append(this.template(this.model.toJSON()))
        .append( new Wall_VSL({matchId: this.model.attributes.matchId, owner: 'HintFull_VM', hintNumber: this.model.attributes.number}).render().el );
        return this;
      }
    });

    return HintFull_VM;

  });