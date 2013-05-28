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
        initialize: function () {
          this.model = new Match();
          this.collection = new HintCollection();
          this.loading = new LoadingView();
          this.model.on("EditPartita_VM_MATCHSYNC", this.sfh, this);
          this.collection.on("add", this.render, this);
          this.model.on("EditPartita_VM_MATCHNAMEUPDATED", this.removeLoading, this);
          this.model.on("EditPartita_VM_MATCHLAUNCHED", this.navigateToElencoPartite, this);
          this.model.id = this.options.matchIdToGet;
          this.model.fetchFromP("EditPartita_VM");
          
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

        lp: function () {
          this.loading.render();
          this.model.launchPartita("EditPartita_VM");
        },

        sfh: function () {
          this.collection.getFromParse(this.model.id);
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