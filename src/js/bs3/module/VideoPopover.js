define([
  'summernote/base/core/func',
  'summernote/base/core/list',
  'summernote/base/core/dom',
  'summernote/base/core/key'
], function (func, list, dom, key) {
  var VideoPopover = function (context) {
    var self = this;
    var ui = $.summernote.ui;

    var options = context.options;

    this.shouldInitialize = function () {
      return !list.isEmpty(options.popover.video);
    };

    this.events = {
      'summernote.keydown': function (we, e) {
        self.handleKeydown(e);
      }
    };

    this.initialize = function () {
      this.$popover = ui.popover({
        className: 'note-video-popover'
      }).render().appendTo('body');
      var $content = this.$popover.find('.popover-content');

      context.invoke('buttons.build', $content, options.popover.video);
    };

    this.destroy = function () {
      this.$popover.remove();
    };

    this.isVisible = function () {
      return this.$popover.is(':visible');
    };

    this.update = function (target) {
      if ($(target).hasClass('note-video-thumb')) {
        var pos = dom.posFromPlaceholder(target);
        this.$popover.css({
          display: 'block',
          left: pos.left,
          top: pos.top
        });

        //be sure editor has focus to handle key events
        context.invoke('editor.focus');
      } else {
        this.hide();
      }
    };

    this.hide = function () {
      this.$popover.hide();
    };

    this.handleKeydown = function (e) {
      if (list.contains([key.code.BACKSPACE], e.keyCode)) {
        if (this.isVisible()) {
          context.invoke('editor.removeMedia');
        }
      }
    };

    this.openUrl = function () {
      var $target = $(context.invoke('editor.restoreTarget'));
      var provider = $target.attr('data-provider');
      var url = null;
      var id = $target.attr('data-id');
      if (provider === 'youtube') {
        url = 'https://youtu.be/' + id;
      }
      else if (provider === 'vimeo') {
        url = 'https://vimeo.com/' + id;
      }

      if (url) {
        window.open(url);
      }
    };
  };

  return VideoPopover;
});
