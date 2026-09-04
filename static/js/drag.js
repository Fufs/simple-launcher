var dragItem = null;
var dragSrc = null;
var dragAxes = {x: false, y: false}
var dragOffset = {x: 0, y: 0}
var dragLimits = {x: {min: 0, max: 0}, y: {min: 0, max: 0}}
var dragThreshold = {x: null, y: null};

var inputShields = Array.from(document.getElementsByClassName("input-shield"));

// TODO: Multi touch handling

// function clampNumber(value, min, max) {
//     if (value >= max) return max;
//     else if (value <= min) return min;
//     else return value;
// }

function parseDimension(dim) {
    // TODO: Check if px
    return Number(dim.slice(0,-2))
}

function enableShield(shield) {
    if (!shield.classList.contains('active')) shield.classList.add('active');
}

function disableShield(shield) {
    if (shield.classList.contains('active')) shield.classList.remove('active');
}

function pauseEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}

calculateThreshold = (min, max) => (min + max) / 2

function dragEnable(item, src, axes, limits, threshold, e) {
    dragItem = item;
    dragSrc = src;
    dragAxes = axes;
    dragLimits = limits;
    dragThreshold = dragThreshold
    if (axes.x) {
        if (dragThreshold.x === null) dragThreshold.x = calculateThreshold(limits.x.min, limits.x.max);
        if (src === "mouse") dragOffset.x = e.clientX;
        else if (src === "touch") dragOffset.x = e.touches[0].clientX;
    }
    if (axes.y) {
        if (dragThreshold.y === null) dragThreshold.y = calculateThreshold(limits.y.min, limits.y.max);
        if (src === "mouse") dragOffset.y = e.clientY;
        else if (src === "touch") dragOffset.y = e.touches[0].clientY;
    }

    inputShields.forEach(enableShield);
    pauseEvent(e);
}

function dragDisable(source) {
    if (source === dragSrc) {
        if (dragAxes.x) {
            curr = parseDimension(dragItem.style.left);
            if (curr < dragThreshold.x) dragItem.style.left = dragLimits.x.min + "px";
            else dragItem.style.left = dragLimits.x.max + "px";
        }
        if (dragAxes.y) {
            curr = parseDimension(dragItem.style.top);
            if (curr < dragThreshold.y) dragItem.style.top = dragLimits.y.min + "px";
            else dragItem.style.top = dragLimits.y.max + "px";
        }

        dragItem = null;
        inputShields.forEach(disableShield);
    }
}

function dragMouseHandler(e) {
    if (dragItem && dragSrc === "mouse") {
        if (dragAxes.x) {
            curr = parseDimension(dragItem.style.left);
            dragItem.style.left = (curr + e.clientX - dragOffset.x)+"px";
            dragOffset.x = e.clientX

        }
        if (dragAxes.y) {
            curr = parseDimension(dragItem.style.top);
            dragItem.style.top = (curr + e.clientY - dragOffset.y)+"px";
            dragOffset.y = e.clientY;
        }
        pauseEvent(e);
    }
}

function dragTouchHandler(e) {
    if (dragItem && dragSrc === "touch") {
        if (dragAxes.x) {
            curr = Number(dragItem.style.left.slice(0,-2))
            dragItem.style.left = (curr + e.touches[0].clientX - dragOffset.x)+"px";
            dragOffset.x = e.touches[0].clientX

        }
        if (dragAxes.y) {
            curr = Number(dragItem.style.top.slice(0,-2));
            dragItem.style.top = (curr + e.touches[0].clientY - dragOffset.y)+"px";
            dragOffset.y = e.touches[0].clientY;
        }
        pauseEvent(e);
    }
}

function createNewDragableElement(container, handle, axes, limits, threshold = {x: null, y: null}) {
    handle.addEventListener("mousedown", (e) => dragEnable(container, "mouse", axes, limits, threshold, e));
    handle.addEventListener("touchstart", (e) => dragEnable(container, "touch", axes, limits, threshold, e));
}

addEventListener("mouseup", () => dragDisable("mouse"))
addEventListener("mouseleave", () => dragDisable("mouse"))
addEventListener("mousemove", dragMouseHandler)

addEventListener("touchend", () => dragDisable("touch"))
addEventListener("touchcancel", () => dragDisable("touch"))
addEventListener("touchmove", dragTouchHandler);
