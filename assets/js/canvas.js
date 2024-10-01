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
    $('.canvas-element.sizing').removeClass('sizing').removeAttr('data-origin-x').removeAttr('data-origin-y');
}

/**
 * Changes the size of the canvas element that is currently being resized
 */
function sizeCanvasElement() {
    let sizingElement = $('.canvas-element.sizing').get(0);
    if (sizingElement) {
        // Getting the size of the element
        let xOrigin = $(sizingElement).attr('data-origin-x');
        let yOrigin = $(sizingElement).attr('data-origin-y');
        let width = Math.abs(xOrigin - mouse.xCanvas);
        let height = Math.abs(yOrigin - mouse.yCanvas);

        //Triangles are sized differently to other shapes
        if (mouse.selectedShape.includes('triangle')) {
            let triangleType = mouse.selectedShape.slice(9);
            switch (triangleType) {
                case 'up':
                    $(sizingElement).css('border-bottom', `${height}px solid red`)
                        .css('border-left', `${width / 2}px solid transparent`)
                        .css('border-right', `${width / 2}px solid transparent`);
                    break;
                case 'right':
                    $(sizingElement).css('border-left', `${width}px solid red`)
                        .css('border-top', `${height / 2}px solid transparent`)
                        .css('border-bottom', `${height / 2}px solid transparent`);
                    break;
                case 'down':
                    $(sizingElement).css('border-top', `${height}px solid red`)
                        .css('border-left', `${width / 2}px solid transparent`)
                        .css('border-right', `${width / 2}px solid transparent`);
                    break;
                case 'left':
                    $(sizingElement).css('border-right', `${width}px solid red`)
                        .css('border-top', `${height / 2}px solid transparent`)
                        .css('border-bottom', `${height / 2}px solid transparent`);
                    break;
                default:
                    break;
            }
        }
        // All other shapes
        else {
            $(sizingElement).css('width', `${width}px`).css('height', `${height}px`);
        }

        // Allowing negative sizes
        if (mouse.xCanvas < xOrigin) {
            $(sizingElement).css('left', `${mouse.xCanvas}px`);
        }
        if (mouse.yCanvas < yOrigin) {
            $(sizingElement).css('top', `${mouse.yCanvas}px`);
        }
    }
}

$(document).ready(() => {
    $('#canvas').mousedown(canvasMouseDown).mouseup(canvasMouseUp).on('mousemove', sizeCanvasElement);
});