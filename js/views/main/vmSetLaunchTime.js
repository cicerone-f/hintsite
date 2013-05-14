/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/set-launch-time.html",
  "views/sub/vsHeader"
],
    function (
      $, 
      _, 
      Backbone, 
      Parse, 
      Handlebars, 
      template,
      vsHeader
      ) {

    var vmSetLaunchTime = Parse.View.extend({

        template: Handlebars.compile(template),

        render: function (eventName) {
          var header = new vsHeader();
          $(this.el).html( 
            header.render(
              {title:header.titles.vmSetLaunchTime}
            ).el ).append(this.template());
          return this;


        }
      });

    return vmSetLaunchTime;

  });