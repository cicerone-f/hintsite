/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/set-launch-time.html",
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

    var SetLaunchTime_VM = Parse.View.extend({

        template: Handlebars.compile(template),

        render: function (eventName) {
          var header = new Header_VS();
          $(this.el).html( 
            header.render(
              {title:header.titles.SetLaunchTime_VM}
            ).el ).append(this.template());
          return this;


        }
      });

    return SetLaunchTime_VM;

  });