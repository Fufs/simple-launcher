var dragItem = null;
var dragSrc = null;
var dragDir = false; // false - x, true - y
var dragOffset = 0;
var dragMin = 0;
var dragMax = 0;
var dragThreshold = 0;

var inputShields = Array.from(document.getElementsByClassName("input-shield"));

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

function dragEnable(item, src, dir, min, max, e) {
    dragItem = item;
    dragSrc = src;
    dragDir = dir;
    dragMin = min;
    dragMax = max;
    dragThreshold = (min + max) / 2;
    if (!dir) dragOffset = e.clientX;
    else dragOffset = e.clientY;

    inputShields.forEach(enableShield);
    pauseEvent(e);
}

function dragDisable(source) {
    if (source === dragSrc) {
        if (!dragDir) {
            console.log(dragMin, dragMax, dragThreshold)
            curr = parseDimension(dragItem.style.left);
            if (curr < dragThreshold) dragItem.style.left = dragMin + "px";
            else dragItem.style.left = dragMax + "px";
        } else {
            curr = parseDimension(dragItem.style.top);
            if (curr < dragThreshold) dragItem.style.top = dragMin + "px";
            else dragItem.style.top = dragMax + "px";
        }
        dragItem = null;
        inputShields.forEach(disableShield);
    }
}

function dragMouseHandler(e) {
    if (dragItem && dragSrc === "mouse") {
        if (!dragDir) {
            curr = parseDimension(dragItem.style.left);
            dragItem.style.left = (curr + e.clientX - dragOffset)+"px";
            dragOffset = e.clientX

        } else {
            curr = parseDimension(dragItem.style.top);
            dragItem.style.top = (curr + e.clientY - dragOffset)+"px";
            dragOffset = e.clientY;
        }
        pauseEvent(e);
    }
}

// TODO: track finger index in dragSrc
function dragTouchHandler(e) {
    if (dragItem && dragSrc === "touch") {
        console.log(e.touches[0])

        if (!dragDir) {
            curr = Number(dragItem.style.left.slice(0,-2))
            dragItem.style.left = (curr + e.touches[0].clientX - dragOffset)+"px";
            dragOffset = e.touches[0].clientX

        } else {
            curr = Number(dragItem.style.top.slice(0,-2));
            dragItem.style.top = (curr + e.touches[0].clientY - dragOffset)+"px";
            dragOffset = e.touches[0].clientY;
        }
        pauseEvent(e);
    }
}

function createNewDragableElement(container, handle, dir, min, max) {
    handle.addEventListener("mousedown", (e) => dragEnable(container, "mouse", dir, min, max, e));
    handle.addEventListener("touchstart", (e) => dragEnable(container, "touch", dir, min, max, e));
}

addEventListener("mouseup", () => dragDisable("mouse"))
addEventListener("mouseleave", () => dragDisable("mouse"))
addEventListener("mousemove", dragMouseHandler)

addEventListener("touchend", () => dragDisable("touch"))
addEventListener("touchcancel", () => dragDisable("touch"))
addEventListener("touchmove", dragTouchHandler);

// ---

var screenSaver = document.getElementById("screensaver");
var screenSaverHandle = document.getElementById("screensaver-handle");

var controlSlideout = document.getElementById("control-slideout");
var controlSlideoutHandle = document.getElementById("control-slideout");

screenSaver.childNodes[1].src = magicMirrorURL;
controlSlideout.childNodes[1].src = homeAssistantURL;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
screenSaver.style.top = 0;
controlSlideout.style.left = viewportWidth+"px";

createNewDragableElement(screenSaver, screenSaverHandle, true, -viewportHeight, 0)
createNewDragableElement(controlSlideout, controlSlideoutHandle, false, Math.trunc(0.795 * viewportWidth), viewportWidth)
