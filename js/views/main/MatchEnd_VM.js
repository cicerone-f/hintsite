/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "text!templates/main/match-end.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Pms,
    template
  ) {
    var HintFound_VM = Parse.View.extend({
        id: 'container',
       
        template: Handlebars.compile(template),
        
        model: Pms,

        events: {
          "click #next" : "backToHome"        
        },

        initialize: function () {
          console.log("a");
          this.model = new Pms();
          this.model.getMyPmsForMatch(this.options.matchId);
          this.model.on("gettedMyPmsForMatch",this.render,this);
          this.matchId = this.options.matchId;
        },

        render: function (eventName) {
          var messageFound = 'Match Completed! Well done! you are the XXX';
          $(this.el).html(this.template({message: messageFound}));
          return this;
        },

        backToHome: function () {
          Parse.history.navigate("", {trigger: true});
        },

        unrender: function() {
          this.remove();
        }

      });
    return HintFound_VM;
  });