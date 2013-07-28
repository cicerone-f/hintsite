/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "text!templates/main/hint-found.html"
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
          "click #next" : "backToMatch"        
        },

        initialize: function () {
          this.model = new Pms();
          this.model.getMyPmsForMatch(this.options.matchId);
          this.model.on("gettedMyPmsForMatch",this.render,this);
          this.matchId = this.options.matchId;
        },

        render: function (eventName) {
          var messageFound = 'Hint Completed! Well done!';
          $(this.el).html(this.template({message: messageFound}));
          return this;
        },

        backToMatch: function () {
          if (this.model.attributes.myHint<5){
            Parse.history.navigate("matches/" + this.matchId, {trigger: true});
          }else{
            Parse.history.navigate("matchEnd/" + this.matchId, {trigger: true});
          }
        },

        unrender: function() {
          this.remove();
        }

      });
    return HintFound_VM;
  });