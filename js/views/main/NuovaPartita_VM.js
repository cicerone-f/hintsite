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
    var NuovaPartita_VM = Parse.View.extend({
        id: 'container',
        template: Handlebars.compile(template),
        model: Match,
        collection: HintCollection,
        initialize: function () {
          this.model = new Match();
          this.collection = new HintCollection();
          this.loading = new LoadingView();
          this.model.on("NuovaPartita_VM_MATCHCREATED", this.cfh, this);
          this.model.on("NuovaPartita_VM_MATCHNAMEUPDATED", this.removeLoading, this);
          this.model.on("NuovaPartita_VM_MATCHLAUNCHED", this.navigateToElencoPartite, this);
          this.collection.on("NuovaPartita_VM_COLLECTIONCOMPLETED", this.render, this);
          this.model.saveDraftToP();
        },
        events: {
          "blur #matchname": "snp",
          "click #launch": "lp",
          "click #setlaunchtime": "navigateToSetLaunchTime"
        },

        navigateToElencoPartite : function () {
          this.removeLoading();
          Parse.history.navigate('', { trigger : true, replace : true });
        },

        navigateToSetLaunchTime : function () {
          Parse.history.navigate('setLaunchTime/' + this.model.id, { trigger : true });
        },

        lp: function () {
          this.loading.render();
          this.model.launchPartita("NuovaPartita_VM");
        },

        cfh: function () {
          //console.log(this.model.id);
          this.collection.createFourHints(this.model.id);
        },

        sfh: function () {
          //console.log(this.model.id);
          this.collection.getFromParse(this.model.id);
        },

        snp: function () {
          this.loading.render();
          this.model.salvaNomePartita("NuovaPartita_VM",$("#matchname").val());
        },

        removeLoading: function () {
          this.loading.remove();
        },

        render: function (eventName) {
          var header = new Header_VS({owner: "NuovaPartita_VM",backViewModelId:0});
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