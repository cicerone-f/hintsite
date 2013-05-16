/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/Header_VS",
  "leaflet",
  "text!templates/main/map.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Header_VS,
    leaflet,
    template
  ) {
    var SetHintPosition_VM = Parse.View.extend({
      template: Handlebars.compile(template),
      initialize: function () {

        this.render();
      },

      render: function (eventName) {
        var header = new Header_VS();
        var title = "MAPPA";
        //$(this.el).html(header.render({'title': title}).el).append("string");
        $(this.el).html(header.render({'title': title}).el).append(this.template());
        var options = {
          center: [51.505, -0.09],
          zoom: 10
        };
        var map = L.map(this.$('#map')[0], options);
        L.tileLayer('http://{s}.tile.cloudmade.com/3baed80b0bcf4a42b46b25833591b090/997/256/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
          maxZoom: 18
        }).addTo(map);

        return this;
      }

    });
    return SetHintPosition_VM;
  });