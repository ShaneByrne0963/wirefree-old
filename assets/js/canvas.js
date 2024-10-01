/**
 * Is called when the canvas is clicked
 * @param {Object} e The event object created with the event
 */
function canvasMouseDown(e) {
    if (mouse.selectedShape.length > 0) {
        // Finding the location to put the new element
        let newElement = $('<div></div>').addClass(`canvas-element element-shape-${mouse.selectedShape} sizing`)
            .css('top', `${mouse.yCanvas}px`).css('left', `${mouse.xCanvas}px`)
            .attr('data-origin-x', mouse.xCanvas).attr('data-origin-y', mouse.yCanvas);
        $('#canvas').append(newElement);
    }
}

/**
 * Is called when the canvas is unclicked
 * @param {Object} e The event object created with the event
 */
function canvasMouseUp(e) {
    $('.canvas-element.sizing').removeClass('sizing');
}

function sizeCanvasElement() {
    let sizingElement = $('.canvas-element.sizing').get(0);
    if (sizingElement) {
        let width = Math.abs($(sizingElement).attr('data-origin-x') - mouse.xCanvas);
        let height = Math.abs($(sizingElement).attr('data-origin-y') - mouse.yCanvas);
        $(sizingElement).css('width', `${width}px`).css('height', `${height}px`);
    }
}

$(document).ready(() => {
    $('#canvas').mousedown(canvasMouseDown).mouseup(canvasMouseUp).on('mousemove', sizeCanvasElement);
});