define(["jquery", "underscore", "backbone", "collections/AdCollection", "models/Ad", "views/AdView", "views/AdListView"],
    function ($, _, Backbone, AdCollection, Ad, AdView, AdListView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "list",
        "list": "list",
        "ads/:id": "adDetails"
      },

      initialize: function () {
        $('#back').on('touchend', function (event) {
          window.history.back();
          return false;
        });
        var ad1 = new Ad({
          title: "Camera1",
          price: "200"
        });
        var ad2 = new Ad({
          title: "Camera2",
          price: "150"
        });
        this.ads = new AdCollection([ad1, ad2]);
      },

      list: function () {
        var page = new AdListView({
          model: this.ads
        });
        this.changePage(page);
      },

      adDetails: function (id) {
        var ad = this.ads.get(id);
        this.changePage(new AdView({
          model: ad
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
