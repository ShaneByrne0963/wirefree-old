$(document).ready(() => {
    // Selects the clicked shape
    $('.shape-button').click(function() {
        let isSelected = $(this).hasClass('selected');
        $('.shape-button.selected').removeClass('selected');
        mouse.selectedShape = '';
        $('#canvas').removeClass('has-shape');
        if (!isSelected) {
            $(this).addClass('selected');
            let shape = $(this).attr('id').slice(6);
            mouse.selectedShape = shape;
            $('#canvas').addClass('has-shape');
        }
    });
});