const mousePosition = {
    x: 0,
    y: 0,
    xPrevious: 0,
    yPrevious: 0
}

function openElement(elementQuery=this) {
    $(elementQuery).removeClass('closed');
}

/**
 * Closes an element, starting a shrinking and fading animation until the element disappears
 * @param {String} elementId The id of the element to be closed
 */
function closeElement(elementQuery=this) {
    $(elementQuery).removeClass('closed').addClass('closed');
}

/**
 * Moves the selected element in relation to the mouse
 */
function moveElement(elementQuery=this) {
    let movingElement = $(elementQuery);
    let top = parseInt(movingElement.css('top'));
    let left = parseInt(movingElement.css('left'));
    left += mousePosition.x - mousePosition.xPrevious;
    top += mousePosition.y - mousePosition.yPrevious;
    movingElement.css('top', `${top}px`).css('left', `${left}px`);
}

$('document').ready(() => {
    $(".dropdown-trigger").dropdown({
        constrainWidth: false,
        coverTrigger: false
    });

    
    $('#side-panel-top').click(function(e) {
        // Closing the side panel if the X is clicked
        let clickedElement = e.target;
        if (clickedElement.id === 'side-panel-close') {
            closeElement('#side-panel');
        }
    }).mousedown(function(e) {
        // Moving the side panel
        let clickedElement = e.target;
        if (clickedElement.id === 'side-panel-top') {
            $(clickedElement).removeClass('moving').addClass('moving').mouseup(function() {
                $(this).removeClass('moving');
            });
        }
    });
});
$('body').on('mousemove', (e) => {
    let mouseX = e.pageX;
    let mouseY = e.pageY;
    mousePosition.x = mouseX;
    mousePosition.y = mouseY;

    // All functions involving mouse movement should be called here
    $('.moving').each(function() {
        let moveData = $(this).attr('data-move');
        moveElement((moveData) ? moveData : this);
    });

    mousePosition.xPrevious = mouseX;
    mousePosition.yPrevious = mouseY;
});