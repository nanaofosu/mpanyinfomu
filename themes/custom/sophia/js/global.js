/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.sophia = {
    attach: function(context, settings) {

      /*  Corecting text on the asset detail page */
      let symptomName = $('.asset-detail-page .symptom-name').text();
      let assetType = $('.asset-detail-page .asset-type').text();
      symptomName = symptomName.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
        return txtVal.toUpperCase();
      });
      assetType = assetType.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
        return txtVal.toUpperCase();
      });
      $("#block-views-block-s2d-asset-details-block-2 h3").text("More about " + symptomName);
      $("#block-views-block-s2d-asset-details-block-3 h3").text("More " + assetType + "s");

      /* Removing unwanted asset types under "More [Asset] on Asset detail page"*/
      //get the asset name for the above variable assetType
      //check the asset type is equal to this asset type, if not remove the closest parent div
      $(".view-display-id-block_3 .similar-assets .classification").each(function( index) {
        if($(this).text().toLowerCase() != assetType.toLowerCase()){
          $(this).closest('.views-row').remove();
        }
      });

      //get the quick edit field type
      $("div").each(function(index) {
        if (!$(this).attr('class')) { //check that this is a div with no class name
          if (Date.parse($(this).html())) { //check that the value of the html can be parsed as a date.
            $(this).remove();
          }
        }
      });


    }
  };


})(jQuery, Drupal);
