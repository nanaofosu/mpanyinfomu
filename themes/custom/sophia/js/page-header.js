(function($, Drupal) {
    'use strict';

    $(document).ready(function(){
		let pageTitleUnchanged = $('.path-browse-symptoms .page-title');
        let selectedFacet = $("#symptom-association-topic").text()
        if(selectedFacet.length > 0){
            pageTitleUnchanged.html("Results for <strong>"+selectedFacet+" </strong>");
        }
        else{
            pageTitleUnchanged.text("Results for All Topics");
        }
        // alert("Browse Topics "+selectedFacet)
	});
    
})(jQuery, Drupal);
