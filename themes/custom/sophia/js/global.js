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
      $(".view-display-id-block_3 .similar-assets .classification").each(function(index) {
        if ($(this).text().toLowerCase() != assetType.toLowerCase()) {
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

      /*  Seting breadcrumb in asset detail page  */
      $('.asset-detail-page #breadcrumb-link').text(symptomName);
      $('.asset-detail-page #breadcrumb-link').attr('href', '/browse-symptoms?f[0]=symptom_association_group_title:'+symptomName.toLowerCase());

      /*  Setting more link value */
      $('.asset-detail-page #more-about-sympton .more-link a').text("View All " + symptomName + " Content");
      $('.asset-detail-page #more-about-sympton .more-link a').attr('href', '/browse-symptoms?f[0]=symptom_association_group_title:'+symptomName.toLowerCase());

      /*  Setting H2 in asset detail page "More about Symptom"  */
      $('.asset-detail-page #more-about-sympton h2').text("More about "+ symptomName);

      /* Deleting unwanted series items*/
      let seriesName = $(".view-s2d-asset-details.view-display-id-block_1 .views-field-field-series .field-content").text().trim();
      if(seriesName == "no-series"){
        $(".view-id-s2d_asset_details.view-display-id-asset_series").remove();
        $(".view-s2d-asset-details.view-display-id-block_1 .views-field-field-series .field-content").remove();
      }else{
        $(".view-s2d-asset-details.view-display-id-block_1 .views-field-field-series .field-content").remove();
      }

    }
  };

  $(".field--name-name input").attr('maxlength','120');

})(jQuery, Drupal);
