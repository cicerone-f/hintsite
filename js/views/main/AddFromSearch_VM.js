/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/UserSearched",
  "collections/PmsCollection",
  "models/Pms",
  "text!templates/main/search-add-from-search.html",
  "views/LoadingView",
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    UserSearched,
    PmsCollection,
    Pms,
    template,
    LoadingView
  ) {
    var AddFromSearch_VM = Parse.View.extend({
        id: 'popup-container',
        template: Handlebars.compile(template),
        model: UserSearched,
        pms: Pms,
        collection: PmsCollection,
        initialize: function () {
          this.pms = new Pms();
          this.collection = this.options.collection;
          this.model = new UserSearched();
          this.model.on("change", this.appendFoundUser, this);
          this.pms.on("AddFromSearch_VM_PMSLISTED", this.addToCollection, this);
          this.loading = new LoadingView();
          this.loading.render();
        },
        events: {
          "blur #nick": "searchNick",
          "click #close-popup": "unrenderAddFromSearch",
          "click #user-to-add": "askToSavePms"
        },

        searchNick: function () {
          $("#overlay-loading").fadeIn();
          this.model.getFromParse(this.$("#nick").val());
        },

        render: function (eventName) {
          var match = this.model.toJSON();
          $(this.el).html(this.template(match));
          return this;
        },

        appendFoundUser: function (){
          /*var foundUserViewItem = new PlayerToAdd_VSI({username:this.model.attributes.username});
          $(this.el).append( foundUserViewItem.render().el );*/
          this.render();
        },

        unrenderAddFromSearch: function (eventName){
          this.remove();
        },

        askToSavePms: function () {
          $("#overlay-loading").fadeIn();
          this.pms.savePms(this.model.id,this.options.matchId);
        },

        addToCollection: function () {
          this.remove();
          this.collection.add(this.pms);
        }

      });
    return AddFromSearch_VM;
  });