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
  "views/sub/list/HintEdit_VSL"
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
    HintEdit_VSL
  ) {
    var NuovaPartita_VM = Parse.View.extend({
        template: Handlebars.compile(template),
        model: new Match(),
        collection: new HintCollection(),
        initialize: function () {
          this.model.on("NuovaPartita_VM_MATCHCREATED", this.cfh, this);
          this.model.on("NuovaPartita_VM_MATCHSYNC", this.sfh, this);
          this.model.on("NuovaPartita_VM_MATCHLAUNCHED", this.navigateToElencoPartite, this);
          this.collection.on("NuovaPartita_VM_COLLECTIONCOMPLETED", this.render, this);
          this.collection.on("add", this.render, this);
          if (this.options.matchIdToGet) {
            this.model.id = this.options.matchIdToGet;
            this.model.fetchFromP();
          } else {
            this.model.saveDraftToP();
          }
        },
        events: {
          "blur #matchname": "snp",
          "touchend #launch": "lp",
          "touchend #launchtime": "navigateToSetLaunchTime"
        },

        navigateToElencoPartite : function () {
          Parse.history.navigate('', { trigger : true, replace : true });
        },

        navigateToSetLaunchTime : function () {
          Parse.history.navigate('setLaunchTime', { trigger : true });
        },

        lp: function () {
          this.model.launchPartita();
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
          this.model.salvaNomePartita($("#matchname").val());
        },

        render: function (eventName) {
          var header = new Header_VS();
          var launchfooter = new LaunchFooter_VS();
          var hintlistedit = new HintEdit_VSL({collection: this.collection});
          var match = this.model.toJSON();
          $(this.el)
            .html(header.render({title: header.titles.NuovaPartita_VM}).el)
            .append(this.template(match))
            .append(hintlistedit.render().el)
            .append(launchfooter.render().el);
          return this;
        }

      });
    return NuovaPartita_VM;
  });