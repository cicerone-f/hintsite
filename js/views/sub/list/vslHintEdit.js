/*jslint undef: true*/
/*global define*/

define([
    "jquery",
    "underscore",
    "backbone",
    "Parse",
    "handlebars",
    "views/sub/item/vsiHintEdit",
    "collections/HintCollection",
    "models/Hint",
    "text!templates/hint-list.html"
],
    function (
        $,
        _,
        Backbone,
        Parse,
        Handlebars,
        vsiHintEdit,
        HintCollection,
        Hint,
        template
    ) {

        var vslHintEdit = Parse.View.extend({
                tagName: "ul",
                id: "list",
                template: Handlebars.compile(template),
                render: function (eventName) {
                    $(this.el).empty();
                    _.each(this.collection.models, function (hint) {
                        $(this.el).append(new vsiHintEdit({
                            model: hint
                        }).render().el);
                    }, this);
                    return this;
                }
            });

        return vslHintEdit;

    });