// for nav view
$('input.search-box').focusin(function() {
  $(this).addClass('focus');
});

$('input.search-box').on('focusout', _.debounce(removeFocus, 100));

function removeFocus() {
  $(this).removeClass('focus');
}
// end nav view
