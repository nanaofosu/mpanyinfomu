/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

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

      /*  Seting breadcrumb in asset detail page  */
      $('.asset-detail-page #breadcrumb-link').text("Browse Topics: "+symptomName);
      $('.asset-detail-page #breadcrumb-link').attr('href', '/browse-symptoms?f[0]=symptom_association_group_title:'+symptomName.toLowerCase());

      /*  Setting more link value */
      $('.asset-detail-page #more-about-sympton .more-link a').text("View All " + symptomName + " Content");
      // $('.asset-detail-page #more-about-sympton .more-link a').attr('href', '/browse-symptoms?f[0]=symptom_association_group_title:'+symptomName.toLowerCase());

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

      //Asset Detail Page: Hide "View all [Symptom name] assets" if there are less than 3 assets
      // let moduleID = $('.asset-detail-page #asset-id').data("module-id");
      // let similarAssets = $('.asset-detail-page .similar-assets.item').toArray();
      // $.each(similarAssets, function() {
      //   //remove redundant asset
      //   if($(this).data("module-id") == moduleID ){
      //     $(this).closest('.views-row').remove();
      //     let moreAssetCount = $('.view-display-id-more_about_symptom > div.view-content .views-row').length;
      //     if(moreAssetCount < 3){
      //       $('.user-logged-in.path-group .more-link').remove();
      //     }
      //   }
      //   else{
          // let moreAssetCount = $('.view-display-id-more_about_symptom > div.view-content .views-row').length;
          // if(moreAssetCount < 3){
          //   $('.user-logged-in.path-group .more-link').remove();
          // }
      //     else if(moreAssetCount > 3){
      //       $('.view-display-id-more_about_symptom > div.view-content .views-row:gt(2)').remove();
      //     }
      //   }
      // });

      //Faceted Search: All Symptoms results has several blank rows before results appear below these rows (see screenshot)
      let facetSearchAllSymtoms = $('.path-browse-symptoms .view-s2d-faceted-search .view-content .views-row div.views-field.views-field-module-name-1 span.field-content').toArray();
      $.each(facetSearchAllSymtoms, function(index, el) {
        if($(this).html() == ""){
          $(this).closest('.views-row').remove();
        }
      });

  //Student Portal: Home page: Put Diagnostic Reasoning topic first in page body
  // let diagnosticReasoning = $(".path-frontpage #main-region .view-s2d-dashboard strong:contains('Diagnostic Reasoning')");
  // diagnosticReasoning.closest('.views-row').prependTo( $( ".path-frontpage #main-region .view-s2d-dashboard .view-content" ) );

  //Put Diagnostic Reasoning as first dropdown menu item under Browse Topics
  // let diagnosticReasoningInMenu = $(".portal-header .view-s2d-dashboard  .view-content a:contains('Diagnostic Reasoning')");
  // diagnosticReasoningInMenu.closest('.views-row').prependTo( $( ".portal-header .view-s2d-dashboard .view-content") );


  // $(".nam input").attr('maxlength','120');

  $('#opigno-module-edit-form .field--name-field-asset-display-title input').on('change keyup paste', function() {
    $('#opigno-module-edit-form .field--name-name input').val(this.value);
  });
  
  

})(jQuery, Drupal);
