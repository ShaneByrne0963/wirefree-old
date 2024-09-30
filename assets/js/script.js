/**
 * Closes an element, starting a shrinking and fading animation until the element disappears
 * @param {String} elementId The id of the element to be closed
 */
function closeElement(elementId) {
    $(`#${elementId}`).removeClass('closed animate').addClass('closed animate');
}

$('document').ready(() => {
    $('#side-panel-close').click(() => {
        closeElement('side-panel');
    });
});