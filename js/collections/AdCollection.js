define(["jquery", "underscore", "backbone", "models/Ad"],
    function ($, _, Backbone, Ad) {

    var AdCollection = Backbone.Collection.extend({
        model: Ad
      });

    return AdCollection;

  });