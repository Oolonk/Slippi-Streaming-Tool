const { app, Menu, Tray} = require('electron')
require('@electron/remote/main').initialize()
const electron = require('electron')
const { BrowserWindow } = require('electron')
var ipc = require('electron').ipcMain;
var url = require('url')
const util = require('util')
const { SlippiGame, Ports, DolphinConnection, ConnectionStatus} = require('@slippi/slippi-js')
const fs = require("fs")
var path = require('path')
const WebSocket = require("ws")
var ping = 1;
const dialog = electron.dialog;
var payloadvar;
var win = null;
var lellel;
var appIcon;
var contextMenu;
var lollol = false;
var ending;
var playerbackup = [];

if (process.platform === "win32") {
  ending = "ico"
}else {
  ending = "png"

}
if (require('electron-squirrel-startup'));
function createWindow() {
    win = new BrowserWindow({
      width: 1200,
      minWidth:510,
      height: 700,
      minHeight: 200,
      icon:   path.normalize(__dirname + '/script/icon.' + ending),
      frame: true,
      resizable : true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
        devTools: false
      }})

require("@electron/remote/main").enable(win.webContents)
    win.setMenuBarVisibility(false)
    win.loadURL(url.format({
        pathname: path.normalize( __dirname + '/index.html'),
        protocol: 'file',
        slashes: true
    }))

    appIcon = new Tray( path.normalize(__dirname + '/script/icon.' + ending))
    contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                win.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true
                app.quit()
            }
        }
    ])

    appIcon.setToolTip('Slippi Stream Tool');

  appIcon.on('right-click', () => {
    appIcon.popUpContextMenu();
  })
  appIcon.on('click', () => {
      win.show()
  });

    win.on('close', function (event) {
        win = null
    })

    win.on('minimize', function (event) {
        event.preventDefault()
        win.hide()
    })

        fs.readFile( path.normalize(app.getPath('userData') + '/saves/autohide.txt'), 'utf8', function (err, data) {
          if(err) console.log('error', err);
          if (data == "true") {
              win.hide()
          }
        });
        ipc.handle('dark-mode:toggle', () => {
            if (nativeTheme.shouldUseDarkColors) {
              nativeTheme.themeSource = 'light'
            } else {
              nativeTheme.themeSource = 'dark'
            }
            return nativeTheme.shouldUseDarkColors
          })

          ipc.handle('dark-mode:system', () => {
            nativeTheme.themeSource = 'system'
          })

            appIcon.setContextMenu(contextMenu);
}

app.commandLine.appendSwitch("disable-gpu")
app.commandLine.appendSwitch("disable-software-rasterizer");
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("disable-raf-throttling");
app.on('ready', () => {
  createWindow();
});

/*setTimeout(function() {
  win.webContents.openDevTools();
  console.log("test")
}, 3000);
  /*
This example script connects to a relay, automatically detects combos,
and generates a Dolphin-compatible `combos.json` file when disconnected
from the relay.
*/
var leftcolor;
var rightcolor;
var start = false;


// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SlpFolderStream, SlpLiveStream, Slpstream, SlpRealTime } = require("@vinceau/slp-realtime");

// TODO: Make sure you set this value!
var slpLiveFolderPath = path.normalize(app.getPath('userData'));
// TODO: Make sure you set these values!
// Connect to the relay


const stream = new SlpLiveStream("console");


const wss = new WebSocket.Server({ port: 42069 });
wss.on("connection", (client) => {
  console.log("Client connected!");
  client.send( JSON.stringify({
    start: start,
  leftcolor: leftcolor,
  rightcolor: rightcolor,
  payload: payloadvar



})
);

  client.on('message', message => {
    var data = JSON.parse(message)
    if (data.event == 'getStats' ) {
    console.log(util.inspect(data, false, null, true /* enable colors */))
    client.send(JSON.stringify({
      event: 'Stats',
       games: getStats(data.games)
     })
   );
    }
  })




});
const sendUpdate = (data) => {
  wss.clients.forEach((client) => {
    // const data = `hello world ${counter}!`;
    if (client !== wss && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Add the combos to the queue whenever we detect them
const realtime = new SlpRealTime();
/*
realtime.game.start$.subscribe((payload) => {
  console.log(payload)
  isTeams = payload.isTeams;
  players = payload.players;

  if (isTeams == true) {

  if (players[0].teamId == 0)
    leftcolor = [241, 89, 89];
  else if (players[0].teamId == 1)
    leftcolor = [101, 101, 254];
  else
    leftcolor = [76, 228, 76];
var z = 1;
if (players[0].teamId == players[1].teamId) {
  z = 2;
}

      if (players[z].teamId == 0)
        rightcolor = [241, 89, 89];
      else if (players[z].teamId == 1)
        rightcolor = [101, 101, 254];
      else
        rightcolor = [76, 228, 76];

    } else {
      if (players[0].port == 1)
        leftcolor = [241, 89, 89];
      else if (players[0].port == 2)
        leftcolor = [101, 101, 254];
      else if (players[0].port == 3)
        leftcolor = [254, 190, 63];
      else if (players[0].port == 4)
        leftcolor = [76, 228, 76];
      else
        leftcolor = [127, 127, 127];


          if (players[1].port == 1)
            rightcolor = [241, 89, 89];
          else if (players[1].port == 2)
            rightcolor = [101, 101, 254];
          else if (players[1].port == 3)
            rightcolor = [254, 190, 63];
          else if (players[1].port == 4)
            rightcolor = [76, 228, 76];
          else
            rightcolor = [127, 127, 127];
  }



  sendUpdate(
    JSON.stringify({
      event: "start",
      leftcolor: leftcolor,
      rightcolor: rightcolor,
      payload: payload
    })
  );
  start = true;
  console.log("START");

});
realtime.game.end$.subscribe((payload) => {
    var player;
    console.log("Game!");
    console.log(payload.winnerPlayerIndex);
  if (isTeams == true) {

    if (players[payload.winnerPlayerIndex].teamId == 0)
      player = [241, 89, 89];
    else if (players[payload.winnerPlayerIndex].teamId == 1)
      player = [101, 101, 254];
    else
      player = [76, 228, 76];

      } else {
        if (payload.winnerPlayerIndex == 0)
          player = [241, 89, 89];
        else if (payload.winnerPlayerIndex == 1)
          player = [101, 101, 254];
        else if (payload.winnerPlayerIndex == 2)
          player = [254, 190, 63];
        else if (payload.winnerPlayerIndex == 3)
          player = [76, 228, 76];
        else
          player = [127, 127, 127];
    }

      start = false;
    sendUpdate(
    JSON.stringify({
      event: "end",
      player: player,
      payload: payload
    })
  );
  });

realtime.stock.playerDied$.subscribe((payload) => {
  var player;
  var opponent;
    if (isTeams == true) {
      if (players[payload.playerIndex].teamId == 0)
        player = [241, 89, 89];
      else if (players[payload.playerIndex].teamId == 1)
        player = [101, 101, 254];
      else
        player = [76, 228, 76];

        if (players[payload.opponentIndex].teamId == 0)
          opponent = [241, 89, 89];
        else if (players[payload.opponentIndex].teamId == 1)
          opponent = [101, 101, 254];
        else
          opponent = [76, 228, 76];

    } else {

        if (payload.playerIndex == 0)
          player = [241, 89, 89];
        else if (payload.playerIndex == 1)
          player = [101, 101, 254];
        else if (payload.playerIndex == 2)
          player = [254, 190, 63];
        else
          player = [76, 228, 76];

          if (payload.opponentIndex == 0)
            opponent = [241, 89, 89];
          else if (payload.opponentIndex == 1)
            opponent = [101, 101, 254];
          else if (payload.opponentIndex == 2)
            opponent = [254, 190, 63];
          else
            opponent = [76, 228, 76];

  }
  sendUpdate(
  JSON.stringify({
    event: "died",
    player: player,
    opponent: opponent,
    payload: payload
  })
);
});
// You can do the same subscription above without using RxJS.
// Doing so would make the subcription look something like this:

// realtime.combo.end$.subscribe(payload => {
//   if (comboFilter.isCombo(payload.combo, payload.settings)) {
//     console.log("Detected combo!");
//     const filename = stream.getCurrentFilename();
//     if (filename) {
//       comboQueue.push({path: filename, combo: payload.combo});
//     }
//   }
// });
*/
ipc.on('start', (event, lolistgut) => {
  lellel = lolistgut;
  slpLiveFolderPath = lolistgut[2];
  lollol = true;
  realtime.setStream(stream);
    stream.start("localhost", lolistgut[1])
      .then(() => {
        console.log("Successfully connected!");
      })

})
ipc.on('folder', (event, value) => {
  slpLiveFolderPath = value;
})


stream.connection.on("statusChange", (status) => {
  if (status === ConnectionStatus.DISCONNECTED) {
    console.log("Disconnected to " + lellel[1]);
      if (lollol) {
        stream.start("localhost", lellel[1])
          .then(() => {
          })
}

sendUpdate(
  JSON.stringify({
    event: "end",
    player: null
  })
  );
}
});
ipc.on('stop', (event, arg) => {
lollol = false;
        // ipc.send('connection', 'Not Connected');
})

//Rest API
function getStats(games){
  var files = fs.readdirSync(slpLiveFolderPath, [])
  .map(function(v) {
    return { name:v };
  })
  .filter(files => files.name.endsWith('.slp'))
  files = files.sort(function(a, b) {
    var fest;
    var yuio;
    const gamer = new SlippiGame(path.normalize(slpLiveFolderPath + "/" +  a.name));
    const gamet = new SlippiGame(path.normalize(slpLiveFolderPath + "/" +  b.name));
    if (gamer.getMetadata() == null)
      fest = "1";
    else
      fest = gamer.getMetadata().startAt;

    if (gamet.getMetadata() == null)
      yuio = "1";
    else
      yuio = gamet.getMetadata().startAt;
    return yuio.replace(/\D/g,'') - fest.replace(/\D/g,'');
  })
  .map(function(v) { return path.normalize(slpLiveFolderPath + "/" +  v.name); });
var stats = { stats: [], settings: [], metadata: []};

for (var i = 0; i < parseInt(games, 10); i++) {
  const gamez = new SlippiGame(files[i]);
  stats.stats[parseInt(games, 10) - i - 1] = gamez.getStats()
  stats.settings[parseInt(games, 10) - i - 1] = gamez.getSettings()
  stats.metadata[parseInt(games, 10) - i - 1] = gamez.getMetadata()
}
return stats;
}
//Overlay API

 var watch = require('object-watcher').watch;
 var overlayData = {
   "settings": undefined ,
   "options": undefined ,
   "lastFinalizedFrame": undefined,
   "latestFrameIndex": undefined ,
   "options": undefined ,
   "frame": undefined ,
   "gameEnd": undefined ,
   "lras": undefined,
   "combo": undefined
 };
 watch(stream.parser, 'lastFinalizedFrame', function(){

   overlayData.settings = stream.parser.settings;
   overlayData.options = stream.parser.options;
   overlayData.lastFinalizedFrame = stream.parser.lastFinalizedFrame;
   overlayData.settingsComplete = stream.parser.settingsComplete;
   overlayData.latestFrameIndex = stream.parser.latestFrameIndex;
   overlayData.options = stream.parser.options;
   overlayData.gameEnd = null;
   overlayData.lras = null;
   overlayData.frame = stream.parser.frames[stream.parser.latestFrameIndex];
   overlayData.combo = realtime.combo.comboComputer.combos;
   // fs.writeFileSync('json/overlay.json', util.inspect(overlayData));
   for(var i = 0; i < 4; i++){
     if(stream.parser.frames[stream.parser.latestFrameIndex]){
     if(stream.parser.frames[stream.parser.latestFrameIndex].players[i]){
      playerbackup[i] = stream.parser.frames[stream.parser.latestFrameIndex].players[i];
      //console.log("Normal wurde genommen");
     }else{
      overlayData.frame.players[i] = playerbackup[i];
      console.log("Backup wurde genommen");
     }
   }
  }
   sendUpdateOverlay(overlayData);
 });
 /*
 realtime.game.end$.subscribe((payload) => {


     overlayData.settings = stream.parser.settings;
     overlayData.options = stream.parser.options;
     overlayData.lastFinalizedFrame = stream.parser.lastFinalizedFrame;
     overlayData.settingsComplete = stream.parser.settingsComplete;
     overlayData.latestFrameIndex = stream.parser.latestFrameIndex;
     overlayData.options = stream.parser.options;
     overlayData.frame = stream.parser.frames[stream.parser.latestFrameIndex];
     overlayData.combo = realtime.combo.comboComputer.combos;
     overlayData.gameEnd = payload.gameEndMethod;
     overlayData.lras = payload.winnerPlayerIndex;
     //fs.writeFileSync('realtime.json', util.inspect(stream.parser));
     // fs.writeFileSync('json/game/overlay.json', util.inspect(overlayData));

     sendUpdateOverlay(overlayData);
   });

*/

 // Variable Changed!
 const ws2 = new WebSocket.Server({ port: 42070 });
 ws2.on("connection", (client) => {
   console.log("Overlay client connected!");
 });



 const sendUpdateOverlay = (data) => {
   ws2.clients.forEach((client) => {
     // const data = `hello world ${counter}!`;
     if (client !== wss && client.readyState === WebSocket.OPEN) {
       client.send(
         JSON.stringify({
           data
         })
       );
     }
   });
 };

setInterval(function(){
  if (ping == 1)  {
    ping = 0;
  }else {
    ping = 1;
  }

}, 1000)
/*
dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
};
*/

ipc.on('ping', (event, arg) => {
  console.log(arg) // prints "ping"

  var pjson = require('./package.json');
  var pjson2 = pjson.version;
  console.log(typeof pjson2);
    event.returnValue = pjson2;
})
