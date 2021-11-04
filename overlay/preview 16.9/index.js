
var ws;
    ws = new WebSocket('ws://localhost:42070');
    ws.onopen = function () {
        // subscribe to some channels
        // ws.send(JSON.stringify({
        //.... some message the I must send when I connect ....
        // }));
        open = true;
        console.log("connected");
    };
    ws.onmessage = function (e) {
      console.log(e.data)
    }
