var screenSaver = document.getElementById("screensaver");
var screenSaverHandle = document.getElementById("screensaver-handle");

var controlSlideout = document.getElementById("control-slideout");
var controlSlideoutHandle = document.getElementById("control-slideout");

screenSaver.childNodes[1].src = magicMirrorURL;
controlSlideout.childNodes[1].src = homeAssistantURL;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
screenSaver.style.top = 0;
controlSlideout.style.left = viewportWidth + "px";

createNewDragableElement(
    screenSaver, screenSaverHandle,
    {x: false, y: true},
    {y: {min: -viewportHeight, max: 0}}
)
createNewDragableElement(
    controlSlideout, controlSlideoutHandle,
    {x: true, y: false},
    {x: {min: Math.trunc(0.775 * viewportWidth), max: viewportWidth}}
)
