/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Match",
  "models/WallMessage",
  "models/UserSearched",  
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
    WallMessage,
    UserSearched,    
    HintCollection,
    PmsCollection,
    template,
    Header_VS,
    LaunchFooter_VS,
    HintEdit_VSL,
    LoadingView,
    Error_VM
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
          this.pmsCollection.on("EditPartita_VM_MATCHLAUNCHED", this.checkMatchDate, this);
          this.pmsCollection.on("pointscanbeadded",this.addPointsToUser, this);
          this.model.on("EditPartita_VM_MATCHTIMENOW", this.navigateToElencoPartite, this);
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

        checkMatchDate: function () {
          if (this.model.attributes.launchTime) {
            this.navigateToElencoPartite();
          } else {
            this.model.saveTimePartitaNow("EditPartita_VM");
          }
        },

        addPointsToUser: function () {
          var user = new UserSearched();
          user.addPoints(1000);
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
            var wallMsg = new WallMessage();
            wallMsg.saveToP(wallMsg.messageTypes.MATCH_CREATED, this.model.id); 
            this.pmsCollection.launchPartita("EditPartita_VM", this.model.id);
          }
          else{
            var ErrorView = new Error_VM({errorMsg: launchability});
            ErrorView.render();
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