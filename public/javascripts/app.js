$('input.search-box').focusin(function() {
  $(this).addClass('focus');
});

$('input.search-box').on('focusout', debounce(removeFocus, 100));

function removeFocus() {
  $('.focus').removeClass('focus');
}


function debounce(fn, delay) {
  // maintain a timer
  let timer = null;
  // closure function that has access to timer
  return function() {
    // get the scope and parameters of the function
    // via 'this' and 'arguments'
    let context = this;
    let args = arguments;
    // if event is called, clear the timer and start over
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
