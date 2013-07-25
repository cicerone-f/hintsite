/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Match",
  "collections/HintCollection",
  "collections/PmsCollection",
  "text!templates/main/new-match.html",
  "views/sub/Header_VS",
  "views/sub/LaunchFooter_VS",
  "views/sub/list/HintEdit_VSL",
  "views/LoadingView"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Match,
    HintCollection,
    PmsCollection,
    template,
    Header_VS,
    LaunchFooter_VS,
    HintEdit_VSL,
    LoadingView
  ) {
    var EditPartita_VM = Parse.View.extend({
        id: 'container',
        template: Handlebars.compile(template),
        model: Match,
        collection: HintCollection,
        pmsCollection: PmsCollection,
        initialize: function () {
          this.model = new Match();
          this.collection = new HintCollection();
          this.pmsCollection = new PmsCollection();
          this.loading = new LoadingView();
          this.model.on("EditPartita_VM_MATCHSYNC", this.sfh, this);
          this.collection.on("OKHINTSITE", this.fetchPmsCollection, this);
          this.model.on("EditPartita_VM_MATCHNAMEUPDATED", this.removeLoading, this);
          this.pmsCollection.on("EditPartita_VM_MATCHLAUNCHED", this.navigateToElencoPartite, this);
          this.model.id = this.options.matchIdToGet;
          this.model.fetchFromP("EditPartita_VM");
          this.pmsCollection.on("PMSPLAYERSFETCHED",this.render,this);          
        },

        events: {
          "blur #matchname": "snp",
          "click #launch": "lp",
          "click #setlaunchtime": "navigateToSetLaunchTime",
          "click #addPlayers": "navigateToSelezioneGiocatori"
        },
        
        fetchPmsCollection : function (){
          this.pmsCollection.getFromParseValidate(this.model.id);
        },

        navigateToElencoPartite : function () {
          this.removeLoading();
          Parse.history.navigate('', { trigger : true, replace : true });
        },

        navigateToSetLaunchTime : function () {
          Parse.history.navigate('setLaunchTime/' + this.model.id, { trigger : true });
        },

        navigateToSelezioneGiocatori : function () {
          Parse.history.navigate('selezioneGiocatori/' + this.model.id, { trigger : true });
        },

        matchCanBeLaunched : function () {
          if ( $.trim(this.model.attributes.name) != "" ){
                        console.log(this.pmsCollection);
            if (this.pmsCollection.length >1 ){
              if (this.collection.isLaunchable()) {
                if (this.collection.isInRange()){
                  console.log("lanciata");
                  return "tuttoapposto";
                }
                else{
                  console.log("norange");
                  return "Non in range";
                }
              }else{
                console.log("nodesc");
                return "No description for each hint";
              }
            }else{
              console.log("noplayers");
              return "not enough Players";
            }
          }else{
            console.log("noname");
            return "no name for match";
          }
        },

        lp: function () {
          var launchability = this.matchCanBeLaunched();
          if ( launchability == "tuttoapposto"){
            this.loading.render();
            this.pmsCollection.launchPartita("EditPartita_VM", this.model.id);
          }
          else{
            console.log(launchability);
          }
        },

        sfh: function () {
          this.collection.getFromParse(this.model.id, 4);
        },

        snp: function () {
          this.loading.render();
          this.model.salvaNomePartita("EditPartita_VM",$("#matchname").val());
        },

        removeLoading: function () {
          this.loading.remove();
        },

        render: function (eventName) {
          var header = new Header_VS({owner: "EditPartita_VM",backViewModelId:0});
          var launchfooter = new LaunchFooter_VS();
          var hintlistedit = new HintEdit_VSL({collection: this.collection});
          var match = this.model.toJSON();
          $(this.el)
            .html(header.render().el)
            .append(this.template(match))
            .append(hintlistedit.render().el)
            .append(launchfooter.render().el);
          return this;
        }

      });
    return EditPartita_VM;
  });