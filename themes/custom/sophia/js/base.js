(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.sophia = {
    attach: function (){
      let $html = $('html');
      $html.removeClass('no-js');
    }
  }

})(jQuery, Drupal);
