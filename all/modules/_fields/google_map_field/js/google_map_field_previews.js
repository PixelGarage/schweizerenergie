
/**
 * @file
 * This file contains the javascript functions used by the google map field
 * widget.
 */

/**
 * Add code to generate the maps on page load.
 */
(function ($) {

  Drupal.behaviors.google_map_field = {
    attach: function (context) {

      googleMapFieldPreviews();

      $('.google-map-field-clear').bind('click', function(event) {
        event.preventDefault();
        var data_delta = $(this).attr('data-delta');
        $('input[data-name-delta="'+data_delta+'"]').prop('value', '').attr('value', '');
        $('input[data-lat-delta="'+data_delta+'"]').prop('value', '').attr('value', '');
        $('input[data-lng-delta="'+data_delta+'"]').prop('value', '').attr('value', '');
        $('input[data-zoom-delta="'+data_delta+'"]').prop('value', '').attr('value', '');
        googleMapFieldPreviews(data_delta);
      });

      $('.google-map-field-watch-change').change(function(event) {
        var data_delta = $(this).attr('data-lat-delta') || $(this).attr('data-lng-delta') || $(this).attr('data-zoom-delta');
        googleMapFieldPreviews(data_delta);
      });

    }
  };

})(jQuery);
