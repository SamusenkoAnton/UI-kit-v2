$(document).ready(function() {
    $('[required],[pattern]')
        .parent()
        .css({position : 'relative'})
        .append('<div class="valid"></div>');
});
