/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/Match_VSL",
  "views/sub/NewMatch_VS",
  "views/sub/Header_VS",
  "collections/PmsCollection",
  "models/Pms"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Match_VSL,
      NewMatch_VS,
      Header_VS,
      PmsCollection,
      Pms
    ) {

    var ElencoPartite_VM = Parse.View.extend({
        tagName: "div",
        id: "container",
        collection: PmsCollection,
        initialize: function () {
          this.userStates = (new Pms()).userStates;
          this.matchStates = (new Pms()).matchStates;
          this.collection = new PmsCollection();
          this.collection.getAllUsersPms();
          this.collection.on("add", this.smistaCollection, this);
        },

        smistaCollection: function () {
          // console.log(this.collection);
          this.inCorsoMaster = new PmsCollection();
          this.inCorsoPlayer = new PmsCollection();
          this.sospeseMaster = new PmsCollection();
          this.sospesePlayer = new PmsCollection();   
          
          for (var i=0; i<this.collection.models.length; i++){
            var a = this.collection.models[i].attributes;
            if( a.matchState == this.matchStates.RUNNING && a.userState == this.userStates.MASTER){
              this.inCorsoMaster.add(this.collection.models[i]);
            } else if(a.matchState == this.matchStates.RUNNING && a.userState == this.userStates.INGAME){
              this.inCorsoPlayer.add(this.collection.models[i]);
            } else if(a.matchState == this.matchStates.DRAFT && a.userState == this.userStates.MASTER){
              this.sospeseMaster.add(this.collection.models[i]);
            } else if(a.matchState == this.matchStates.RUNNING && a.userState == this.userStates.INVITED){
              this.sospesePlayer.add(this.collection.models[i]);
            } 
          }
          this.render();
        },

        render: function (eventName) {
          $(this.el).empty();
          var viewContent = new NewMatch_VS().render().el;
          var header = new Header_VS({owner: "ElencoPartite_VM",backViewModelId:0});
          $(this.el).html(
            header.render().el).append(viewContent)
          .append(new Match_VSL({collection:this.inCorsoMaster, matchType: 'inCorsoMaster' }).render().el)
          .append(new Match_VSL({collection:this.inCorsoPlayer, matchType: 'inCorsoPlayer'}).render().el)
          .append(new Match_VSL({collection:this.sospeseMaster, matchType: 'sospeseMaster'}).render().el)
          .append(new Match_VSL({collection:this.sospesePlayer, matchType: 'sospesePlayer'}).render().el);
          return this;
        }
      });

    return ElencoPartite_VM;

  });


//append(new Match_VSL().render().el)