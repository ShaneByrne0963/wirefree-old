
/**
 * Is called when the canvas is clicked
 */
function canvasMouseDown(e) {
    // Getting the position of the canvas in relation to the browser
    let canvasRect = $('#canvas').get(0).getBoundingClientRect();

    if (mouse.selectedShape.length > 0) {
        // Finding the location to put the new element
        let elementX = mouse.x - canvasRect.left;
        let elementY = mouse.y - canvasRect.top;
        let newElement = $('<div></div>').addClass(`canvas-element element-shape-${mouse.selectedShape}`).css('top', `${elementY}px`).css('left', `${elementX}px`);
        $('#canvas').append(newElement);
    }
}

$(document).ready(() => {
    $('#canvas').mousedown(canvasMouseDown);
});