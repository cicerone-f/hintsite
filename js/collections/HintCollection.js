/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/Hint"
],
  function ($, Parse, Hint) {

    var HintCollection = Parse.Collection.extend({
        model: Hint
      });

    return HintCollection;
  }
  );