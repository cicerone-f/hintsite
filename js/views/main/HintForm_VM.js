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
          this.model.on('HintForm_VM_IMAGEUPDATED', this.render, this);
          this.model.fetchFromP();
        },
        events: {
          "touchend #mappa": "navigateToSetHintPosition",
          "touchend #photo": "getPicture",
          "blur #hint_description": "saveHintDescription",
        },
        navigateToSetHintPosition : function () {
          Parse.history.navigate('sethintposition/' + this.model.id, { trigger : true });
        },

        saveHintDescription: function () {
          this.model.updateDescription($("#hint_description").val());
        },

        getPicture: function () {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            //cameraDirection: Camera.Direction.BACK,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            saveToPhotoAlbum: false
          };
          var self = this;
          var cameraSuccess = function (imageURI) {
            self.model.set("image", imageURI);
            self.uploadPicture(imageURI);
            console.log(imageURI);
          };
          var cameraError = function (error) {
            console.log(error);
          };
          navigator.camera.getPicture(cameraSuccess, cameraError, options);
        },

        uploadPicture: function (imageURI) {
          var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
          options.mimeType = "image/jpeg";

          var params = new Object();
          params.image_name = options.fileName;
          options.params = params;
          options.chunkedMode = false;

          var win = function win(r) {
            this.model.updateImageUrl(r.response);
          };

          var fail = function fail(error) {
            alert("An error has occurred: Code = " + error.code);
          };

          var ft = new FileTransfer();
          ft.upload(imageURI, encodeURI("http://www.hintsiteapp.com/s/s.php"), win, fail, options, true);
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