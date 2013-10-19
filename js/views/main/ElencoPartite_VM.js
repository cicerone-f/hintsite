/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "hammer",
  "views/sub/list/Match_VSL",
  "views/sub/NewMatch_VS",
  "views/sub/HeaderProfilo_VS",
  "collections/PmsCollection",
  "models/Pms",
  "text!templates/main/elenco-partite.html",
  "views/LoadingView",
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Hammer,
      Match_VSL,
      NewMatch_VS,
      HeaderProfilo_VS,
      PmsCollection,
      Pms,
      template,
      LoadingView
    ) {

    var ElencoPartite_VM = Parse.View.extend({
        tagName: "div",
        id: "container",
        className: "elenco-partite",
        collection: PmsCollection,

        template: Handlebars.compile(template),

        names: ["In corso", "Sospese", "Storico", "Pubbliche"],

        initialize: function () {
          this.loading = new LoadingView();
          this.loading.render();      
          this.currentViewmatches = 0;
          this.userStates = (new Pms()).userStates;
          this.matchStates = (new Pms()).matchStates;
          this.collection = new PmsCollection();
          this.collection.getAllUsersPms();
          this.collection.on("addedallpmsforuser", this.smistaCollection, this);
        },

        render: function () {
          $(this.el).empty();
          var header = new HeaderProfilo_VS();
          $(this.el).html(
            header.render().el);
          $("#overlay-loading").fadeIn();  
        },

        smistaCollection: function () {
          this.inCorsoMaster = new PmsCollection();
          this.inCorsoPlayer = new PmsCollection();
          this.sospeseMaster = new PmsCollection();
          this.sospesePlayer = new PmsCollection();
          this.storicoMaster = new PmsCollection();
          this.storicoPlayer = new PmsCollection();
          this.pubbliche = new PmsCollection();      
          
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
            } else if( a.matchState == this.matchStates.ENDED && a.userState == this.userStates.INGAME )
              this.storicoPlayer.add(this.collection.models[i]);
              else if (a.matchState == this.matchStates.ENDED && a.userState == this.userStates.MASTER)
              this.storicoMaster.add(this.collection.models[i]);
          }
          this.renderVero();
        },

        moveViewMatches: function () {
          var tempPerc = (- this.currentViewmatches * 25) + '%';
          $('#container-dei-container').css('-webkit-transform', 'translate3d(' + tempPerc + ', 0, 0)');
        },

        renderVero: function (eventName) {
          $(this.el).empty();
          var header = new HeaderProfilo_VS();
          $(this.el).html(
            header.render().el)
          .append(this.template());
          $(this.el).find('#blabla').html($(new NewMatch_VS().render().el));
          $(this.el).find('#container-incorso-match').append(
            new Match_VSL({collection:this.inCorsoMaster, matchType: 'inCorsoMaster' }).render().el)
            .append(
              new Match_VSL({collection:this.inCorsoPlayer, matchType: 'inCorsoPlayer'}).render().el);
          $(this.el).find('#container-sospese-match').html($(
            new Match_VSL({collection:this.sospeseMaster, matchType: 'sospeseMaster' }).render().el)
            .append(
              new Match_VSL({collection:this.sospesePlayer, matchType: 'sospesePlayer'}).render().el)
          );
          $(this.el).find('#container-storico-match').html($(
            new Match_VSL({collection:this.storicoMaster, matchType: 'storicoMaster' }).render().el)
            .append(
              new Match_VSL({collection:this.storicoPlayer, matchType: 'storicoPlayer'}).render().el)
          );
          $(this.el).find('#container-pubblico-match').html(
              new Match_VSL({collection:this.pubbliche, matchType: 'publicMatch'}).render().el);

          var self = this;

          var mmm = {
            // first: self.names[0],
            // last: self.names[self.names.length - 1],

            fill: function (first, last) {
              this.before = self.names[self.names.length - 1];
              this.current = self.names[0];
              this.after = self.names[1];

              if (first) this.before = '';
              if (last) this.after = '';
            },
            shift: function (dir) {
              if (dir === 'l') {
                self.names.push(self.names.shift());
              } else if (dir === 'r') {
                self.names.unshift(self.names.pop());
              }

              return this;
            }
          }

          mmm.fill(true, false);

          function smistaLoSmistador() {
            $('#smistador > span').each(function (){
              name = $(this).attr('id');
              $(this).text(mmm[name]);
            });
          }

          smistaLoSmistador();

          Hammer($('#container-del-container-dei-container')).on("swipeleft", function (event) {
            event.preventDefault();
            if (self.currentViewmatches < 3) {
              self.currentViewmatches++;
              self.moveViewMatches();
              if (self.currentViewmatches == 3)
                mmm.shift('l').fill(false, true);
              else
                mmm.shift('l').fill(false, false);

              smistaLoSmistador();
            }
          });
          Hammer($('#container-del-container-dei-container')).on("swiperight", function (event) {
            event.preventDefault();
            if (self.currentViewmatches > 0) {
              self.currentViewmatches--;
              self.moveViewMatches();
              if (self.currentViewmatches == 0)
                mmm.shift('r').fill(true, false);
              else
                mmm.shift('r').fill(false, false);

              smistaLoSmistador();
            }
          });
          return this;
        }
      });

    return ElencoPartite_VM;

  });
