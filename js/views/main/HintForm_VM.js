/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Hint",
  "text!templates/main/hint-form.html",
  "views/sub/Header_VS"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Hint,
    template,
    Header_VS
  ) {
    var HintForm_VM = Parse.View.extend({
      id: 'container',
        template: Handlebars.compile(template),
        model: new Hint(),
        initialize: function () {
          this.model.id = this.options.hintIdToGet;
          this.model.on('HintForm_VM_HINTSYNC', this.render, this);
          this.model.fetchFromP();
        },
        events: {
          "touchend #mappa": "navigateToSetHintPosition",
          "blur #hint_description": "saveHintDescription",
        },
        navigateToSetHintPosition : function () {
          Parse.history.navigate('sethintposition/' + this.model.id, { trigger : true });
        },

        saveHintDescription: function () {
          this.model.updateDescription($("#hint_description").val());
        },

        render: function (eventName) {
          
          var header = new Header_VS();
          var hint = this.model.toJSON();
          var title = "Hint #"+ this.model.attributes.number;
          $(this.el)
            .html(header.render({'title': title}).el)
            .append(this.template(hint));
          return this;
        }

      });
    return HintForm_VM;
  });