/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "models/UserSearched",
  "views/LoadingView",
  "text!templates/main/match-end.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Pms,
    UserSearched,
    LoadingView,
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
          this.model = new Pms();
          this.model.getMyPmsForMatch(this.options.matchId);
          this.model.on("gettedMyPmsForMatch",this.foo,this);
          this.model.on("MATCHENDED",this.setOrdine,this);
          this.model.on("ORDINESETTATO",this.render,this);
          this.matchId = this.options.matchId;
        },

        setOrdine : function () {
          this.model.setOrdineArrivo(this.options.matchId);
        },

        foo: function () {
          this.model.editMatchStateEnded(this.model.id);
        },

        addPointsForEndMatch: function () {
          var user = new UserSearched();
          user.addPoints(6000 / this.model.attributes.ordine);
        },

        render: function () {
          var messageFound;
          if (this.model.attributes.ordine) {
            messageFound = 'Match Completed! Well done! you are the ' + this.model.attributes.ordine;
            $(this.el).html(this.template({message: messageFound,next:'yes'}));
            this.addPointsForEndMatch();
          }
          else {
            messageFound = 'Match Completed! Well done!';
            $(this.el).html(this.template({message: messageFound}));
          }
          return this;
        },

        backToHome: function () {
          Parse.history.navigate('', {trigger: true});
        },

        unrender: function() {
          this.remove();
        }

      });
    return HintFound_VM;
  });