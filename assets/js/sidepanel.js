$(document).ready(() => {
    $('.shape-button').click(function() {
        $('.shape-button.selected').removeClass('selected');
        $(this).addClass('selected');
    });
});