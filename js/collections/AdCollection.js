define(["jquery", "underscore", "backbone", "models/ad"],
    function ($, _, Backbone, Ad) {

    var AdCollection = Backbone.Collection.extend({
        model: Ad
      });

    return AdCollection;

  });