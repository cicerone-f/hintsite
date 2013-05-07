define(["jquery", "underscore", "backbone", "models/Hint"],
    function ($, _, Backbone, Hint) {

    var HintCollection = Backbone.Collection.extend({
        model: Hint
      });

    return HintCollection;

  });