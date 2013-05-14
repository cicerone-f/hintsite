
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
  "views/main/vmHintFull",
  "views/main/vmPartitaPlayer",
  "views/main/vmNuovaPartita",
  "views/sub/list/vslHintPreview",
  "views/main/vmElencoPartite",
  "views/sub/list/vslMatch",
  "views/main/vmLogIn",
  "views/main/vmSetLaunchTime"
],
    function ($,
      _,
      Backbone,
      Parse,
      HintCollection,
      MatchCollection,
      Hint,
      Match,
      vmHintFull,
      vmPartitaPlayer,
      vmNuovaPartita,
      vslHintPreview,
      vmElencoPartite,
      vslMatch,
      vmLogIn,
      vmSetLaunchTime
    ) {

    var AppRouter = Parse.Router.extend({

      routes: {
        "": "userControl",
        "list": "list",  //non la chiama mai nessuno!!
        "mainMatchList": "mainMatchList",
        "matches/:id": "matchDetails",
        "hints/:id": "hintDetails",
        "newMatch": "newMatch",
        "setLaunchTime": "setLTime"
      },

      // il div con id #back sta in vmHintFull, perchè mettere qui il touch event?
      // con initialize commentata come sotto funziona lo stesso 
      // visto che l'evento lo gestisce anche vmHintFull
      initialize: function () {
        $('#back').on('touchend', function (event) {
          window.history.back();
          return false; //evito evento default browser
        });
      },

      userControl: function () {
        if (Parse.User.current()) {
          this.mainMatchList();
        } else {
          this.log();
        }
      },

      list: function () {
        var page = new vslHintPreview({
        });
        this.changePage(page);
      },

      mainMatchList: function () {
        var page = new vmElencoPartite({
        });
        this.changePage(page);
      },

      log: function () {
        var page = new vmLogIn({
        });
        this.changePage(page);
      },

      hintDetails: function (id) {
        var self = this;
        var query = new Parse.Query(Hint);
        var hint = query.get(id, {
          success: function (result) {
            self.changePage(new vmHintFull({
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
            self.changePage(new vmPartitaPlayer({
              model: result
            }));
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      newMatch: function () {
        this.changePage(new vmNuovaPartita());
      },

      setLTime: function () {
        this.changePage(new vmSetLaunchTime());
      },

      changePage: function (page) {
        $('body').empty();
        page.render();
        $('body').append($(page.el));
      }

    });

    return AppRouter;

  });