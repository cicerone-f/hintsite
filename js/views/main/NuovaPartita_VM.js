/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Match",
  "models/Pms",
  "collections/HintCollection",
  "collections/PmsCollection",
  "text!templates/main/new-match.html",
  "views/sub/Header_VS",
  "views/sub/LaunchFooter_VS",
  "views/sub/list/HintEdit_VSL",
  "views/LoadingView",
  "views/main/Error_VM"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Match,
    Pms,
    HintCollection,
    PmsCollection,
    template,
    Header_VS,
    LaunchFooter_VS,
    HintEdit_VSL,
    LoadingView,
    Error_VM
  ) {
    var NuovaPartita_VM = Parse.View.extend({
        id: 'container',
        template: Handlebars.compile(template),
        model: Match,
        pms: Pms,
        pmsCollection: PmsCollection,
        collection: HintCollection,
        initialize: function () {
          // git shots
          this.model = new Match();
          this.pms = new Pms();
          this.pmsCollection = new PmsCollection();
          this.collection = new HintCollection();
          this.loading = new LoadingView();
          this.pms.on("NuovaPartita_VM_PMSMASTERCREATED", this.cfh, this);
          this.model.on("NuovaPartita_VM_MATCHCREATED", this.saveMasterDopoCreaPartita, this);
          this.model.on("NuovaPartita_VM_MATCHNAMEUPDATED", this.removeLoading, this);
          this.pmsCollection.on("NuovaPartita_VM_MATCHLAUNCHED", this.checkMatchDate, this);
          this.model.on("EditPartita_VM_MATCHTIMENOW", this.navigateToElencoPartite, this);
          this.collection.on("NuovaPartita_VM_COLLECTIONCOMPLETED", this.fetchPmsCollection, this);
          this.pmsCollection.on("PMSPLAYERSFETCHED",this.render,this);
          this.model.saveDraftToP();
        },

        fetchPmsCollection : function (){
          this.pmsCollection.getFromParseValidate(this.model.id);
        },

        events: {
          "blur #matchname": "snp",
          "click #launch": "lp",
          "click #setlaunchtime": "navigateToSetLaunchTime",
          "click #addPlayers": "navigateToSelezioneGiocatori"
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

        checkMatchDate: function () {
          if (this.model.attributes.launchTime) {
            this.navigateToElencoPartite();
          } else {
            this.model.saveTimePartitaNow("EditPartita_VM");
          }
        },

        matchCanBeLaunched : function () {
          if ( $.trim(this.model.attributes.name) != "" ){
            if (this.pmsCollection.length >1 ){
              if (this.collection.isLaunchable()) {
                if (this.collection.isInRange()){
                  return "tuttoapposto";
                }
                else{
                  return "Non in range";
                }
              }else{
                return "No description for each hint";
              }
            }else{
              return "not enough Players";
            }
          }else{
            return "no name for match";
          }
        },

        lp: function () {
          var launchability = this.matchCanBeLaunched();
          if ( launchability == "tuttoapposto"){
            this.loading.render();
            this.pmsCollection.launchPartita("NuovaPartita_VM", this.model.id);
          }
          else{
            var ErrorView = new Error_VM({errorMsg: launchability});
            ErrorView.render();
          }
        },

        cfh: function () {
          this.collection.createFourHints(this.model.id);
        },

        saveMasterDopoCreaPartita: function () {
          this.pms.saveMaster(this.model.id);
        },

        sfh: function () {
          //console.log(this.model.id);
          this.collection.getFromParse(this.model.id);
        },

        snp: function () {
          this.loading.render();
          this.model.salvaNomePartita("NuovaPartita_VM", $("#matchname").val());
        },

        removeLoading: function () {
          this.loading.remove();
        },

        render: function (eventName) {
          var header = new Header_VS({owner: "NuovaPartita_VM", backViewModelId: 0});
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
    return NuovaPartita_VM;
  });