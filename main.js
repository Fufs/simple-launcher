const { app, BrowserWindow, WebContentsView, ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: true,
    transparent: true,
    frame: true, // debug
    webPreferences: {
      webviewTag: true
    }
  })

  win.loadFile("./static/index.html")

  win.setIgnoreMouseEvents(true)

// FIXME: Had promise but couldn't click through to the browser view :(
//   const browser = new WebContentsView()
//   win.contentView.addChildView(browser)
//   browser.webContents.loadURL('https://google.com')
//   browser.setBounds({ x: 0, y: 0, width: 1280, height: 720 })

//   const overlay = new WebContentsView({webPreferences: {transparent: true}})
//   win.contentView.addChildView(overlay)
//   overlay.webContents.loadFile('./static/index.html')
//   overlay.setBounds({ x: 0, y: 0, width: 1280, height: 720 })

//   win.on("resize", (e) => {
//     winSize = win.getSize();

//     browser.setBounds({ x: 0, y: 0, width: winSize[0], height: winSize[1] })
//     overlay.setBounds({ x: 0, y: 0, width: winSize[0], height: winSize[1] })
//   })
}

app.whenReady().then(() => {
  createWindow()
})
