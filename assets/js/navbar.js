/**
 * Clears the canvas of all elements
 */
function clearCanvas() {
    $('#canvas').empty();
}

$(document).ready(() => {
    $('#file-new-project').click(() => {
        clearCanvas();
    });
    $('#window-side-panel').click(() => {
        openElement('#side-panel');
    });
});