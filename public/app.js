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

var dragItem = null;
var dragSrc = null;
var dragDir = false; // false - x, true - y
var dragOffset = 0;


// function clampNumber(value, min, max) {
//     if (value >= max) return max;
//     else if (value <= min) return min;
//     else return value;
// }

function dragEnable(item, src, dir, e) {
    dragItem = item;
    dragSrc = src;
    dragDir = dir;
    if (!dir) dragOffset = e.clientX;
    else dragOffset = e.clientY;
}

function dragDisable(source) {
    if (source === dragSrc) dragItem = null;
}

function dragMouseHandler(e) {
    if (dragItem && dragSrc === "mouse") {
        if (!dragDir) {
            curr = Number(dragItem.style.left.slice(0,-2))
            dragItem.style.left = (curr + e.clientX - dragOffset)+"px";
            dragOffset = e.clientX

        } else {
            curr = Number(dragItem.style.top.slice(0,-2));
            dragItem.style.top = (curr + e.clientY - dragOffset)+"px";
            dragOffset = e.clientY;
        }
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
    }
}

addEventListener("mouseup", () => dragDisable("mouse"))
addEventListener("mouseleave", () => dragDisable("mouse"))
addEventListener("mousemove", dragMouseHandler)

addEventListener("touchend", () => dragDisable("touch"))
addEventListener("touchcancel", () => dragDisable("touch"))
addEventListener("touchmove", dragTouchHandler);

screenSaverHandle.addEventListener("mousedown", (e) => dragEnable(screenSaver, "mouse", true, e));
screenSaverHandle.addEventListener("touchstart", (e) => dragEnable(screenSaver, "touch", true, e));
controlSlideoutHandle.addEventListener("mousedown", (e) => dragEnable(controlSlideout, "mouse", false, e));
controlSlideoutHandle.addEventListener("touchstart", (e) => dragEnable(controlSlideout, "touch", false, e));
