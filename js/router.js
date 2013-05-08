define(["jquery", "underscore", "backbone", "Parse", "collections/HintCollection", "models/Hint", "views/HintView", "views/HintListView","views/LogInView"],
    function ($, _, Backbone, Parse, HintCollection, Hint, HintView, HintListView, LogInView) {

    var AppRouter = Parse.Router.extend({

      routes: {
        "": "log",
        "list": "list",
        "hints/:id": "hintDetails"
      },
			
			// il div con id #back sta in HintView, perchè mettere qui il touch event?
			// con initialize commentata come sotto funziona lo stesso 
			// visto che l'evento lo gestisce anche HintView
      initialize: function () {
        //$('#back').on('touchend', function (event) {
        //  window.history.back();
        //  return false; //evito evento default browser
        //});
      },

      list: function () {
        var page = new HintListView({
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
          success: function(result) {
            self.changePage(new HintView({
              model: result
            }));
          },
          error: function(error) {
              console.log(error);
          }
        });
      },

      changePage: function (page) {
        $('body').empty();
        page.render();
        $('body').append($(page.el));
      }

    });

    return AppRouter;

  });
