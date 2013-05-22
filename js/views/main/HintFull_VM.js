/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/hint-details.html",
  "views/sub/Header_VS"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template,
    Header_VS
  ) {

    var HintFull_VM = Parse.View.extend({

        template: Handlebars.compile(template),

        render: function (eventName) {
          var header = new Header_VS({owner: "HintFull_VM",backViewModelId:this.model.attributes.matchId});
          $(this.el).html(header.render().el).append(this.template(this.model.toJSON()));
          return this;
        }
      });

    return HintFull_VM;

  });