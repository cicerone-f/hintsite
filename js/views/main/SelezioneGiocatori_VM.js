/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "collections/PmsCollection",
  "views/sub/Header_VS",
  "views/sub/SelezioneGiocatoriFooter_VS",
  "views/sub/list/PmsEdit_VSL",
  "views/LoadingView",
  "views/main/AddFromSearch_VM",
  "views/main/Popup_VM"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Pms,
    PmsCollection,
    Header_VS,
    SelezioneGiocatoriFooter_VS,
    PmsEdit_VSL,
    LoadingView,
    AddFromSearch_VM,
    Popup_VM
  ) {
    var SelezioneGiocatori_VM = Parse.View.extend({
      id: 'container',
      collection: PmsCollection,
      initialize: function () {
        this.collection = new PmsCollection();
        this.collection.on("add", this.renderVero, this);
        this.collection.on("remove", this.renderVero, this);
        this.collection.on("noresultsinpmscollection",this.renderVero,this);
        this.collection.getFromParse(this.options.matchIdToGet);
      },
      events: {
        "click #fromSearch": "renderAddFromSearch",
        "click #fromH": "renderPremiumFeature",
        "click #fromFB": "renderPremiumFeature",
      },


      renderAddFromSearch: function (eventName) {
        var afs = new AddFromSearch_VM({collection: this.collection, matchId: this.options.matchIdToGet});
        $(this.el).append(afs.render().el);
        return this;
      },

      renderPremiumFeature: function () {
        $('body').append( 
          new Popup_VM({
            notificationText: 'Please buy Premium Version to use this feature.'
          }).render().el
        );
      },

      renderVero: function () {
        var header = new Header_VS({owner: "SelezioneGiocatori_VM", backViewModelId: this.options.matchIdToGet});
        var SelezioneGiocatoriFooter = new SelezioneGiocatoriFooter_VS();
        var pmslistedit = new PmsEdit_VSL({collection: this.collection});
        $(this.el)
            .html(header.render().el)
            .append(pmslistedit.render().el)
            .append(SelezioneGiocatoriFooter.render().el);
        $("#overlay-loading").fadeOut(); 
      },

      render: function () {
        var header = new Header_VS({owner: "SelezioneGiocatori_VM", backViewModelId: this.options.matchIdToGet});
        $(this.el)
            .html(header.render().el);
                    console.log("renderNONvero");
      }
    });
    return SelezioneGiocatori_VM;
  });