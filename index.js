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
function createWindow() {
    win = new BrowserWindow({
      backgroundColor: '#2e2c29',
      width: 1200,
      height: 700,
      icon:  __dirname + '\\script\\icon.ico',
      frame: true,
      resizable : false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        backgroundThrottling: false,
        contextIsolation: false,
        devTools: false
      }})
    win.setMenuBarVisibility(false)
    win.loadURL(url.format({
        pathname: path.join( __dirname + '\\index.html'),
    }))

    appIcon = new Tray( __dirname + '\\script\\icon.ico')
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

    appIcon.setContextMenu(contextMenu);
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

        fs.readFile( app.getPath('userData') + '\\saves\\autohide.txt', 'utf8', function (err, data) {
          if(err) console.log('error', err);
          if (data == "true") {
              win.hide()
          }
        });
require("@electron/remote/main").enable(win.webContents)
}

app.commandLine.appendSwitch("disable-gpu")
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("disable-raf-throttling");
app.on('ready', createWindow)

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
var slpLiveFolderPath = "C:\\Emulation\\Emulatoren\\Slippi Online\\Slippi";
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
    const gamer = new SlippiGame(slpLiveFolderPath + "\\" +  a.name);
    const gamet = new SlippiGame(slpLiveFolderPath + "\\" +  b.name);
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
  .map(function(v) { return slpLiveFolderPath + "\\" +  v.name; });
var stats = { stats: [], settings: [], metadata: []};

for (var i = 0; i < parseInt(games, 10); i++) {
  const gamez = new SlippiGame(files[i]);
  stats.stats[parseInt(games, 10) - i - 1] = gamez.getStats()
  stats.settings[parseInt(games, 10) - i - 1] = gamez.getSettings()
  stats.metadata[parseInt(games, 10) - i - 1] = gamez.getMetadata()
}
return stats;
}

function stageText(stageId){
if (stageId == 2) {
  return "Fountain of Dreams";
} else if (stageId == 3) {
  return "Pokémon Stadium";
} else if (stageId == 4) {
  return "Princess Peach's Castle";
} else if (stageId == 5) {
  return "Kongo Jungle";
} else if (stageId == 6) {
  return "Brinstar";
} else if (stageId == 7) {
  return "Corneria";
} else if (stageId == 8) {
  return "Yoshi's Story";
} else if (stageId == 9) {
  return "Onett";
} else if (stageId == 10) {
  return "Mute City";
} else if (stageId == 11) {
  return "Rainbow Cruse";
} else if (stageId == 12) {
  return "Jungle Japes";
} else if (stageId == 13) {
  return "Great Bay";
} else if (stageId == 14) {
  return "Hyrule Temple";
} else if (stageId == 15) {
  return "Brinstar Depths";
} else if (stageId == 16) {
  return "Yoshi's Island";
} else if (stageId == 17) {
  return "Green Greens";
} else if (stageId == 18) {
  return "Fourside";
} else if (stageId == 19) {
  return "Mushroom Kingdom I";
} else if (stageId == 20) {
  return "Mushroom Kingdom II";
} else if (stageId == 22) {
  return "Venom";
} else if (stageId == 23) {
  return "Poké Floats";
} else if (stageId == 24) {
  return "Big Blue";
} else if (stageId == 25) {
  return "Icicle Mountain";
} else if (stageId == 26) {
  return "Icetop";
} else if (stageId == 27) {
  return "Flat Zone";
} else if (stageId == 28) {
  return "Dreamland N64"
} else if (stageId == 29) {
  return "Yoshi's Island N64"
} else if (stageId == 30) {
  return "Kongo Jungle N64"
} else if (stageId == 31) {
  return "Battlefield";
} else if (stageId == 32) {
  return "Final Destination";
}
else {
  return "";
}
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
 };
 watch(stream.parser, 'lastFinalizedFrame', function(){

   overlayData.settings = stream.parser.settings;
   overlayData.options = stream.parser.options;
   overlayData.lastFinalizedFrame = stream.parser.lastFinalizedFrame;
   overlayData.settingsComplete = stream.parser.settingsComplete;
   overlayData.latestFrameIndex = stream.parser.latestFrameIndex;
   overlayData.options = stream.parser.options;
   overlayData.gameEnd = stream.parser.gameEnd;
   overlayData.frame = stream.parser.frames[stream.parser.latestFrameIndex];
   overlayData.combo = realtime.combo.combos;
   //fs.writeFileSync('realtime.json', util.inspect(realtime));
   sendUpdateOverlay(overlayData);
 });
 watch(stream.parser, 'gameEnd', function(){

   overlayData.settings = stream.parser.settings;
   overlayData.options = stream.parser.options;
   overlayData.lastFinalizedFrame = stream.parser.lastFinalizedFrame;
   overlayData.settingsComplete = stream.parser.settingsComplete;
   overlayData.latestFrameIndex = stream.parser.latestFrameIndex;
   overlayData.options = stream.parser.options;
   overlayData.gameEnd = stream.parser.gameEnd;
   overlayData.frame = stream.parser.frames[stream.parser.latestFrameIndex];
   overlayData.combo = realtime.combo.combos;
   //fs.writeFileSync('realtime.json', util.inspect());
 });
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
dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
};
