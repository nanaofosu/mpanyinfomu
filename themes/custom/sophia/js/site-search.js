(function ($, Modernizr) {

  // Search field behaviors
  var searchForm		= 'form#sitesearch';
  var searchTrigger = $('#search-trigger');
  var searchfield		= $(searchForm + ' input[type="text"]');
  var submitButton	= $(searchForm + ' button[type="submit"]');

  // Placeholder text fallback
  if(!Modernizr.input.placeholder){
    $('[placeholder]').keydown(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });
  };

  // Trigger search field
  searchTrigger.on('click',function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $(searchForm).slideToggle('600','easeOutBack');
    if(!Modernizr.input.placeholder){
      searchfield.focus().val('').blur();
    }
    else {
      searchfield.focus().val('');
    }
    submitButton.prop('disabled',true);
  });

  // disable submit button by default
  submitButton.prop('disabled',true);

  // enable submit button if search input is populated; disable if empty
  searchfield.keyup(function() {
    if($(this).val() != '') {
      submitButton.prop('disabled',false);
    }
    else {
      submitButton.prop('disabled',true);
    }
  });

  // Hide Search field if visible on scroll down.
  (function () {
    var previousScroll = 0;
    $(window).scroll(function () {
      if ($(window).width() > 767) {
        var currentScroll = $(this).scrollTop();
        if (currentScroll > previousScroll){
          $(searchForm).slideUp('slow');
          searchTrigger.removeClass('active');
          searchfield.val('');
          submitButton.prop('disabled',true);
        }
        previousScroll = currentScroll;
      }
    });
    // ESC key to hide search field.
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        $(searchForm).slideUp('slow');
        searchTrigger.removeClass('active');
        searchfield.val('');
        submitButton.prop('disabled',true);
      }
    });

  }());

})(jQuery, Modernizr);
