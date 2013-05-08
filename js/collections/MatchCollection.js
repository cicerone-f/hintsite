define(["jquery", "Parse", "models/Match"],
    function ($, Parse, Match) {

    var MatchCollection = Parse.Collection.extend({
        model: Match
      });

    return MatchCollection;

  });