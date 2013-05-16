/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/Header_VS",
  "gmaps",
  "text!templates/main/map.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Header_VS,
    gmaps,
    template
  ) {
    var SetHintPosition_VM = Parse.View.extend({
      
      template: Handlebars.compile(template),
      initialize: function () {
            var map;
        },

      render: function (eventName) {
          
        var header = new Header_VS();
        var title = "MAPPA";
        //$(this.el).html(header.render({'title': title}).el).append("string");
        $(this.el).html(this.template());
        
        setTimeout(this.foo,5000);

        return this;
      },
      
      foo: function (){
        map = new google.maps.Map($('#map_canvas')[0], {
          zoom: 12,
          position: new google.maps.LatLng(0, 0),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

      }

      });
    return SetHintPosition_VM;
  });