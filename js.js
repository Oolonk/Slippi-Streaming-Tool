
var ipc = require('electron').ipcRenderer;
var fs = require('fs');
const remote = require('@electron/remote');
const app = remote.app;
var foldervar;
var relay;
var decision;
var AutoLaunch = require('auto-launch');
var leftcolor = 0;
var rightcolor = 0;
var updating2 = false;
var updating = false;
var chromaSDK = undefined;
var ingame = false;
var updating3 = false;
var key = new Array(22);
var ping = 1;
var autohide = false;
var razervalue;
var autoLauncher = new AutoLaunch({
    name: 'Slippi Stream Tool',
});
autoLauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
      console.log("autostart an")
        document.getElementById("autostart").checked = true
    }
})

function autostarting(checked){
    if(checked == true){
        autoLauncher.enable();
    } else {
        autoLauncher.disable();

    }

}

function autohider(checked){
fs.writeFile( app.getPath('userData') + '\\saves\\autohide.txt', checked.toString(), function(err, result) {
  if(err) console.log('error', err);
  });
  }



     function folder(value){
       if (value.includes('.')) {
       value = value.substr(0, value.lastIndexOf("\\"));
       }
      foldervar = value;
      document.getElementById("folder").value = value;
     fs.writeFile( app.getPath('userData') + '\\saves\\folder.txt', value, function(err, result) {
     if(err) console.log('error', err);
     });
     }

    if (!fs.existsSync(app.getPath('userData') + '\\saves\\')){
        fs.mkdirSync(app.getPath('userData') + '\\saves\\');
        console.log("Directory erstellt");
    }


    fs.readFile( app.getPath('userData') + '\\saves\\relay.txt', 'utf8', function (err, data) {
      if(err) console.log('error', err);
      relay = parseInt(data);
      document.getElementById("relayPort").value = relay;
    });

    fs.readFile( app.getPath('userData') + '\\saves\\autohide.txt', 'utf8', function (err, data) {
      if(err) console.log('error', err);
      if (data == "true") {
        document.getElementById("autohide").checked = true;
      }
    });


    fs.readFile( app.getPath('userData') + '\\saves\\folder.txt', 'utf8', function (err, data) {
    foldervar = data;
    document.getElementById("folder").value = foldervar;
    });




function start(){
  var value = {
    decision: "Relay",
    relay: relay,
    folder: foldervar
  };
  ipc.send('start', [decision, relay, foldervar]);
    document.getElementById('startbutton').style.display = 'none';
      document.getElementById('stopbutton').style.display = 'block';
}
function stop(){

  ipc.send('stop', "value")
    document.getElementById('startbutton').style.display = 'block';
      document.getElementById('stopbutton').style.display = 'none';
}

function relaying(value){
  relay = value;
  fs.writeFile( app.getPath('userData') + '\\saves\\relay.txt', value, function(err, result) {
    if(err) console.log('error', err);
  });
}

setInterval(function(){
  if (ping == 1)  {
    ping = 0;
  }else {
    ping = 1;
  }

}, 1000)
