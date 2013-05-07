define(["jquery", "underscore", "backbone", "collections/HintCollection", "models/Hint", "views/HintView", "views/HintListView"],
    function ($, _, Backbone, HintCollection, Hint, HintView, HintListView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "list",
        "list": "list",
        "hints/:id": "hintDetails"
      },

      initialize: function () {
        $('#back').on('touchend', function (event) {
          window.history.back();
          return false; //evito evento default browser
        });
        var hint1 = new Hint({
          number: "1",
          description: "lorem ipsum"
        });
        var hint2 = new Hint({
          number: "2",
          description: "lorem ipsum dolor"
        });
        this.hints = new HintCollection([hint1, hint2]);
      },

      list: function () {
        var page = new HintListView({
          model: this.hints
        });
        this.changePage(page);
      },

      hintDetails: function (id) {
         var hint = this.hints.get(id);
         this.changePage(new HintView({
           model: hint
         }));
      },

      changePage: function (page) {
        $('body').empty();
        page.render();
        $('body').append($(page.el));
      }

    });

    return AppRouter;

  });
