const mouse = {
    x: 0,
    y: 0,
    xPrevious: 0,
    yPrevious: 0,
    xCanvas: 0,
    yCanvas: 0,
    selectedShape: ''
}

/**
 * Closes an element, starting a growing and fade in animation until the element fully appears
 * @param {Query} elementQuery The element to be opened
 */
function openElement(elementQuery=this) {
    $(elementQuery).removeClass('closed');
}

/**
 * Closes an element, starting a shrinking and fade out animation until the element disappears
 * @param {Query} elementQuery The element to be closed
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
    left += mouse.x - mouse.xPrevious;
    top += mouse.y - mouse.yPrevious;
    movingElement.css('top', `${top}px`).css('left', `${left}px`);
}

/**
 * Returns a set of coordinates in relation to the canvas origin
 * @param {Integer} x 
 * @param {Integer} y 
 * @returns {Object} { x, y }
 */
function getCanvasCoordinates(x, y) {
    let canvasRect = $('#canvas').get(0).getBoundingClientRect();
    return {
        x: x - canvasRect.left,
        y: y - canvasRect.top
    }
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
    mouse.x = mouseX;
    mouse.y = mouseY;

    // Storing the mouse position in relation to the canvas
    let canvasCoords = getCanvasCoordinates(mouseX, mouseY);
    mouse.xCanvas = canvasCoords.x;
    mouse.yCanvas = canvasCoords.y;

    // All functions that need the previous position of the mouse should be called below

    // Moving elements with the mouse
    $('.moving').each(function() {
        let moveData = $(this).attr('data-move');
        moveElement((moveData) ? moveData : this);
    });

    mouse.xPrevious = mouseX;
    mouse.yPrevious = mouseY;
});