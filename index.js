$(function(){
  var files = {};
  var uint8ToString = function (buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  };
  var appendBase64 = function (fileName, file) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
      files[fileName] = btoa(uint8ToString(reader.result));
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };
  console.log('here!')
  $('.other_images').on('change', function(event) {
		$('#errors').append('AMK');
    var max_image_size = 0.005; //MB
    var warningTemplate = $('.warning.template').clone().html();
    var templateCopy;
    for (var i = 0; i < $(".other_images").get(0).files.length; i++) {
      var currFile = this.files[i];
      var validImageTypes = ["image/jpeg", "image/png"];

      var fileTypeNotification = '<b>' + currFile.name + '</b> is of type: <i>' + currFile.type + '</i>';
      fileTypeNotification += '<br/>Allowed file types are: ' + validImageTypes.join(', ');
      var fileSizeNotificaiton = '<b>' + currFile.name + '</b> is of size: <i>' +
          currFile.size / (1024 * 1024) + ' MB </i>';
      fileSizeNotificaiton += '<br/>Allowed maximum size is ' + max_image_size + ' MB';

      var hasTypeError = $.inArray(currFile.type, validImageTypes) < 0;
      if (hasTypeError) {
        templateCopy = $(warningTemplate);
        templateCopy.find('.title').html('File Type Error');
        templateCopy.find('.text').html(fileTypeNotification + '.<br/>Your file is invalid type!');
        templateCopy.appendTo('#errors');
      }

      var hasSizeError = Math.round(currFile.size / (1024 * 1024)) > max_image_size;
      if (hasSizeError) {
        templateCopy = $(warningTemplate);
        templateCopy.find('.title').html('File Size Error');
        templateCopy.find('.text').html(fileSizeNotificaiton + '.<br/>Your file is too big!');
        templateCopy.appendTo('#errors');
      }

      if (hasTypeError || hasSizeError) continue;

      // appendBase64(currFile.name, currFile);

      var wrapper = "<div class='col-md-2 p_3 add_preview'>";
      var img = "<img class='img-responsive' width='400' src='"+URL.createObjectURL(event.target.files[i])+"'/>";
      var html = $(wrapper).append(img).html()
      $('.showcase').append(html);

    }
  });
})
