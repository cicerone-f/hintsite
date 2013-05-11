
/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "collections/HintCollection",
  "collections/MatchCollection",
  "models/Hint",
  "models/Match",
  "views/HintView",
  "views/MatchView",
  "views/NewMatchView",
  "views/HintListView",
  "views/MatchListView",
  "views/LogInView"
],
    function ($,
      _,
      Backbone,
      Parse,
      HintCollection,
      MatchCollection,
      Hint,
      Match,
      HintView,
      MatchView,
      NewMatchView,
      HintListView,
      MatchListView,
      LogInView
    ) {

    var AppRouter = Parse.Router.extend({

      routes: {
        "": "userControl",
        "list": "list",
        "matchList": "matchList",
        "matches/:id": "matchDetails",
        "hints/:id": "hintDetails",
        "newMatch": "newMatch"
      },

      // il div con id #back sta in HintView, perchè mettere qui il touch event?
      // con initialize commentata come sotto funziona lo stesso 
      // visto che l'evento lo gestisce anche HintView
      initialize: function () {
        $('#back').on('touchend', function (event) {
          window.history.back();
          return false; //evito evento default browser
        });
      },

      userControl: function () {
        if (Parse.User.current()) {
          this.matchList();
        } else {
          this.log();
        }
      },

      list: function () {
        var page = new HintListView({
        });
        this.changePage(page);
      },

      matchList: function () {
        var page = new MatchListView({
        });
        this.changePage(page);
      },

      log: function () {
        var page = new LogInView({
        });
        this.changePage(page);
      },

      hintDetails: function (id) {
        var self = this;
        var query = new Parse.Query(Hint);
        var hint = query.get(id, {
          success: function (result) {
            self.changePage(new HintView({
              model: result
            }));
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      matchDetails: function (id) {
        var self = this;
        var query = new Parse.Query(Match);
        var match = query.get(id, {
          success: function (result) {
            self.changePage(new MatchView({
              model: result
            }));
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      newMatch: function () {
        this.changePage(new NewMatchView());
      },

      changePage: function (page) {
        $('body').empty();
        page.render();
        $('body').append($(page.el));
      }

    });

    return AppRouter;

  });