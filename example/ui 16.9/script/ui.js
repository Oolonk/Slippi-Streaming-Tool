
define(['require', 'minified'], function (require) {
    var MINI = require('minified');



        var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;
        var ws;
        var frame;
        var damage = [0, 0, 0, 0];
        var damage2 = [0, 0, 0, 0];
      ws = new WebSocket('ws://localhost:42070');
      ws.onopen = function () {
          open = true;
          console.log("connected");
      };
      ws.onmessage = function (e) {
        const slippi = JSON.parse(e.data).data;
        var maxtime;
        var slippi2;
        slippi2 = jQuery.extend(true, {}, slippi);
        //console.log(slippi);
        //Timer function
          maxtime = 28800;
        if (slippi2.lastFinalizedFrame < 0)
          frame = 0;
        else
          frame = slippi2.lastFinalizedFrame;
        var minutes = Math.floor((maxtime-frame)/3600);
        var seconds = Math.floor(((maxtime-frame)%3600)/60);
        var miliseconds = Math.floor(((maxtime-frame)/.6)%100);
        $('#timerminute').fill(minutes.toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false}) + ":" + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false}));
        $('#timerms').fill(miliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false}));

      if (slippi.settings.players.length == 2) {
        slippi2.settings.players[2] = jQuery.extend(true, {}, slippi.settings.players[1]);
        jQuery("#leftoverlay").css({'left':444});
        jQuery("#rightoverlay").css({'right':119});
      }else if (slippi.settings.players.length == 4 && slippi.settings.isTeams) {
        if (!(slippi2.settings.players[0].teamId == slippi2.settings.players[1].teamId)) {

        if (slippi2.settings.players[0].teamId == slippi2.settings.players[2].teamId) {
        var b = slippi.settings.players[1];
          slippi2.settings.players[1] = slippi.settings.players[2];
          slippi2.settings.players[2] = b;
        }else if (slippi2.settings.players[0].teamId == slippi2.settings.players[3].teamId) {
        var a = slippi.settings.players[2];
        var b = slippi.settings.players[1];
            slippi2.settings.players[1] = slippi.settings.players[3];
            slippi2.settings.players[2] = b;
            slippi2.settings.players[3] = a;
          }
        }





        if (slippi2.frame.players[slippi2.settings.players[0].playerIndex].post.internalCharacterId == slippi2.frame.players[slippi2.settings.players[1].playerIndex].post.internalCharacterId && slippi2.settings.players[0].characterColor ==  slippi2.settings.players[1].characterColor)
          jQuery(".stockcolor2").css({'filter':"brightness(167%) saturate(116%)"});
        else
          jQuery(".stockcolor2").css({'filter':"brightness(100%) saturate(100%)"});
        if (slippi2.frame.players[slippi2.settings.players[2].playerIndex].post.internalCharacterId == slippi2.frame.players[slippi2.settings.players[3].playerIndex].post.internalCharacterId && slippi2.settings.players[2].characterColor ==  slippi2.settings.players[3].characterColor)
          jQuery(".stockcolor4").css({'filter':"brightness(167%) saturate(116%)"});
        else
          jQuery(".stockcolor4").css({'filter':"brightness(100%) saturate(100%)"});
      }else if (slippi.settings.players.length == 3){
      jQuery("#leftoverlay").css({'left':335});
      jQuery("#rightoverlay").css({'right':119});
    }if (slippi.settings.players.length == 4) {
      jQuery("#leftoverlay").css({'left':351});
      jQuery("#rightoverlay").css({'right':351});
    }


    for (var i = 0; i < 4; i++) {
      var y = i+1;
      if (slippi2.settings.players.length > i && ((i == 1 && slippi.settings.players.length == 2) == false)){
          if (slippi2.frame.players[slippi2.settings.players[i].playerIndex]) {
            if (slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.actionStateId < 11) {
              if( !jQuery("#playeroverlay" + y).is(':animated') && jQuery("#playeroverlay" + y).css('opacity') != 0.3){
              jQuery("#playerpercentage" + y).animate({"opacity": "0"}, 200);
                jQuery("#playeroverlay" + y).animate({"opacity": "0.3"}, 200);
                }
              }else {
                if( !jQuery("#playeroverlay" + y).is(':animated') && jQuery("#playeroverlay" + y).css('opacity') != 1){
                jQuery("#playeroverlay" + y).animate({"opacity": "1"}, 200);
                jQuery("#playerpercentage" + y).animate({"opacity": "1"}, 200);
                }
          }}else {
            if( !jQuery("#playeroverlay" + y).is(':animated') && jQuery("#playeroverlay" + y).css('opacity') != 0.3){
            jQuery("#playerpercentage" + y).animate({"opacity": "0"}, 200);
              jQuery("#playeroverlay" + y).animate({"opacity": "0.3"}, 200);
              }
          }
        }else{
        jQuery("#playerpercentage" + y).animate({"opacity": "0"}, 20);
          jQuery("#playeroverlay" + y).css('opacity', '0');
          }
    }
      for (var i = 0; i < slippi2.settings.players.length; i++) {
          if (slippi2.frame.players[slippi2.settings.players[i].playerIndex]) {
        const y = i + 1;
        if (slippi2.settings.isTeams) {
          if (slippi2.settings.players[i].teamId == 0) {
            jQuery("#playercolor" + y).css({'background-color':"rgb(241, 89, 89)"});
              jQuery(".char" + y).css({'color':"rgb(241, 89, 89)"});
          } else if (slippi2.settings.players[i].teamId == 1) {
            jQuery("#playercolor" + y).css({'background-color':"rgb(101, 101, 255)"});
              jQuery(".char" + y).css({'color':"rgb(101, 101, 255)"});
          } else {
            jQuery("#playercolor" + y).css({'background-color':"rgb(76, 228, 76)"});
              jQuery(".char" + y).css({'color':"rgb(76, 228, 76)"});
          }
        } else {
          if (slippi2.settings.players[i].type == 1) {
            jQuery("#playercolor" + y).css({'background-color':"rgb(127, 127, 127)"});
            jQuery(".char" + y).css({'color':"rgb(127, 127, 127)"});
          } else if (slippi2.settings.players[i].port == 1) {
            jQuery("#playercolor" + y).css({'background-color':"rgb(241, 89, 89)"});
            jQuery(".char" + y).css({'color':"rgb(241, 89, 89)"});
          } else if (slippi2.settings.players[i].port == 2) {
            jQuery("#playercolor" + y).css({'background-color':"rgb(101, 101, 255)"});
            jQuery(".char" + y).css({'color':"rgb(101, 101, 255)"});
          } else if (slippi2.settings.players[i].port == 3) {
            jQuery("#playercolor" + y).css({'background-color':"rgb(254, 190, 63)"});
            jQuery(".char" + y).css({'color':"rgb(254, 190, 63)"});
          } else {
            jQuery("#playercolor" + y).css({'background-color':"rgb(76, 228, 76)"});
            jQuery(".char" + y).css({'color':"rgb(76, 228, 76)"});
          }
        }
        jQuery("#playercolor" + y).css({'width':slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.shieldSize*(55/12)});
        jQuery(".perc" + y).css({'color': "rgb(" + Math.floor(256-((slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.percent / 500) *256)) + ", " + Math.floor(256-((slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.percent / 250) *256)) + ", " + Math.floor(256-((slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.percent / 250) *256)) + ")"});

        jQuery('.stock' + y).attr("src", "assets/slippi/char/stock-icon-" + internalID(slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.internalCharacterId) + "-" + slippi2.settings.players[i].characterColor + ".png");
        $('#percentage' + y).fill(Math.floor(slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.percent));
if (typeof slippi2.frame.followers !== 'undefined') {
        if (typeof slippi2.frame.followers[slippi2.settings.players[i].playerIndex] !== 'undefined' && slippi2.frame.followers[slippi2.settings.players[i].playerIndex] !== null) {
            $('#nanapercentage' + y).fill(Math.floor(slippi2.frame.followers[slippi2.settings.players[i].playerIndex].post.percent));
            jQuery(".nanaperc" + y).css({'color': "rgb(" + Math.floor(256-((slippi2.frame.followers[slippi2.settings.players[i].playerIndex].post.percent / 500) *256)) + ", " + Math.floor(256-((slippi2.frame.followers[slippi2.settings.players[i].playerIndex].post.percent / 250) *256)) + ", " + Math.floor(256-((slippi2.frame.followers[slippi2.settings.players[i].playerIndex].post.percent / 250) *256)) + ")"});
              if( !jQuery('#nana' + y).is(':animated') && jQuery("#nana" + y).css('opacity') != 1) {
              jQuery('#nana' + y).animate({"opacity": "1"}, 200);}
}else {
  if( !jQuery('#nana' + y).is(':animated') && jQuery("#nana" + y).css('opacity') != 0) {
  jQuery('#nana' + y).animate({"opacity": "0"}, 200);
}
}
}else {
  if( !jQuery('#nana' + y).is(':animated') && jQuery("#nana" + y).css('opacity') != 0) {
  jQuery('#nana' + y).animate({"opacity": "0"}, 200);
}
}
for (var x = 1; x < 5; x++) {
  if (x > slippi2.settings.players[i].startStocks) {
    if( !jQuery('#playerstock' + y + '' + x).is(':animated') && jQuery("#playerstock" + y + '' + x).css('opacity') != 0) {
      jQuery('#playerstock' + y + '' + x).animate({"opacity": "0"}, 200);
    }
  } else if (x > slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.stocksRemaining) {
    if( !jQuery('#playerstock' + y + '' + x).is(':animated') && jQuery("#playerstock" + y + '' + x).css('opacity') != .5) {
      jQuery('#playerstock' + y + '' + x).animate({"opacity": ".5"}, 200);
    }
  } else {
    if( !jQuery('#playerstock' + y + '' + x).is(':animated') && jQuery("#playerstock" + y + '' + x).css('opacity') != 1) {
      jQuery('#playerstock' + y + '' + x).animate({"opacity": "1"}, 200);
    }

  }

  //hitanimation
  if (slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.percent > slippi2.frame.players[slippi2.settings.players[i].playerIndex].pre.percent) {
    var diff = slippi2.frame.players[slippi2.settings.players[i].playerIndex].post.percent - slippi2.frame.players[slippi2.settings.players[i].playerIndex].pre.percent;
    diff = Math.log(diff);
    if (damage[i] == 0) {
      damage[i] = 1;
      jQuery("#playerblack" + y).stop();
      jQuery("#playercolor" + y).stop();
      jQuery("#playerblack" + y).css('left', 0);
      jQuery("#playerblack" + y).css('bottom', 2);
      jQuery("#playercolor" + y).css('left', 0);
      jQuery("#playercolor" + y).css('bottom', 0);
      jQuery("#playerblack" + y).animate({"left": .5* diff}, 100/3, "easeOutQuint");
      jQuery("#playerblack" + y).animate({"bottom": (4* diff)+2}, 100/3, "easeOutQuint");
      jQuery("#playercolor" + y).animate({"left": .5* diff}, 100/3, "easeOutQuint");
      jQuery("#playercolor" + y).animate({"bottom": 4* diff}, 100/3, "easeOutQuint");
    }else {
      damage[i] = 0;
      diff = - diff;
      jQuery("#playerblack" + y).stop();
      jQuery("#playercolor" + y).stop();
      jQuery("#playerblack" + y).css('left', 0);
      jQuery("#playerblack" + y).css('bottom', 2);
      jQuery("#playercolor" + y).css('left', 0);
      jQuery("#playercolor" + y).css('bottom', 0);
      jQuery("#playerblack" + y).animate({"left": .5* diff}, 100/3, "easeOutQuint");
      jQuery("#playerblack" + y).animate({"bottom": (4* diff)+2}, 100/3, "easeOutQuint");
      jQuery("#playercolor" + y).animate({"left": .5* diff}, 100/3, "easeOutQuint");
      jQuery("#playercolor" + y).animate({"bottom": 4* diff}, 100/3, "easeOutQuint");
    }

  }else {
    if( !jQuery("#playerblack" + y).is(':animated') && jQuery("#playerblack" + y).css('left') != 0) {
    jQuery("#playerblack" + y).animate({"left": 0}, 100/3);
    jQuery("#playerblack" + y).animate({"bottom": 2}, 100/3);
    jQuery("#playercolor" + y).animate({"left": 0}, 100/3);
    jQuery("#playercolor" + y).animate({"bottom": 0}, 100/3);
    }
  }

}

//Combo function
  var combos = slippi2.combo.filter(combo => combo.moves.at(-1).playerIndex == slippi2.settings.players[i].playerIndex && (combo.endFrame == null || combo.endFrame >= (slippi2.lastFinalizedFrame - 180)));
  var hitcount = combos.filter(combo => combo.moves.sum("hitCount") >= 3);
  if (hitcount.length != 0) {
    if (hitcount[hitcount.length - 1].moves.sum("hitCount") > 999)
      $('#combo' + y).fill(999);
    else
      $('#combo' + y).fill(hitcount[hitcount.length - 1].moves.sum("hitCount"));
    jQuery("#playercombo" + y).css('opacity', '1');
      if (hitcount[hitcount.length - 1].endFrame) {
      if (slippi2.settings.isTeams == null) {
        if (slippi2.settings.players[i].teamId == 0) {
            jQuery(".char" + y).css({'color':"rgb(241, 89, 89)"});
        } else if (slippi2.settings.players[i].teamId == 1) {
            jQuery(".char" + y).css({'color':"rgb(101, 101, 255)"});
        } else {
            jQuery(".char" + y).css({'color':"rgb(76, 228, 76)"});
        }
      } else {
        if (slippi2.settings.players[i].type == 1) {
          jQuery("#playercolor" + y).css({'background-color':"rgb(127, 127, 127)"});
          jQuery(".char" + y).css({'color':"rgb(127, 127, 127)"});
        } else if (slippi2.settings.players[i].port == 1) {
          jQuery(".char" + y).css({'color':"rgb(241, 89, 89)"});
        } else if (slippi2.settings.players[i].port == 2) {
          jQuery(".char" + y).css({'color':"rgb(101, 101, 255)"});
        } else if (slippi2.settings.players[i].port == 3) {
          jQuery(".char" + y).css({'color':"rgb(254, 190, 63)"});
        } else {
          jQuery(".char" + y).css({'color':"rgb(76, 228, 76)"});
        }
      }

      }else {
        jQuery(".char" + y).css({'color':"rgb(265, 265, 265)"});

      }
  }else {
    jQuery("#playercombo" + y).css('opacity', '0');

  }
      }
      }

      //End function
      if (slippi2.gameEnd || slippi2.lras) {
        if (slippi2.gameEnd == 7) {
        $('#timerminute').fill("");
        $('#timerms').fill("");

          jQuery("#gameEnd").css('opacity', '0');
          jQuery(".gameEndVertical").css('width', '0');
          for (var z = 1; z < 5; z++) {
            jQuery("#nana" + z).css('opacity', '0');
            jQuery("#playeroverlay" + z).css('opacity', '0');
            jQuery("#playerpercentage" + z).css('opacity', '0');
            for (var a = 1; a < 5; a++) {
              jQuery('#playerstock' + z + '' + a).css('opacity', '0');
            }
          }
        } else {
          var text = "Game!";
          if (slippi2.gameEnd == 1) {
            var text = "Time!"
          }
          $('#gameEndSpan').fill(text);
          jQuery("#gameEnd").animate({"opacity": "1"}, 200);
          jQuery(".gameEndVertical").animate({"width": 1356}, 1000);

          setTimeout(function(){
            jQuery("#gameEnd").css('opacity', '0');
            jQuery(".gameEndVertical").css('width', '0');
            $('#timerminute').fill("");
            $('#timerms').fill("");
            for (var z = 1; z < 5; z++) {
              jQuery("#nana" + z).css('opacity', '0');
              jQuery("#playeroverlay" + z).css('opacity', '0');
              jQuery("#playerpercentage" + z).css('opacity', '0');
              for (var a = 1; a < 5; a++) {
                jQuery('#playerstock' + z + '' + a).css('opacity', '0');
              }
            }
          }, 2100);
        }
      }
    }



      Array.prototype.sum = function (prop) {
          var total = 0
          for ( var i = 0, _len = this.length; i < _len; i++ ) {
              total += this[i][prop]
          }
          return total
      }

      //InternalId to Stock IconId
      function internalID(value){
        if (value == 0)
        return 0x08;
        if (value == 1)
        return 0x02;
        if (value == 2)
        return 0x00;
        if (value == 3)
        return 0x01;
        if (value == 4)
        return 0x04;
        if (value == 5)
        return 0x05;
        if (value == 6)
        return 0x06;
        if (value == 7)
        return 0x13;
        if (value == 8)
        return 0x0b;
        if (value == 9)
        return 0x0c;
        if (value == 10)
        return 0x0e;
        if (value == 11)
        return 0x0e;
        if (value == 12)
        return 0x0d;
        if (value == 13)
        return 0x10;
        if (value == 14)
        return 0x11;
        if (value == 15)
        return 0x0f;
        if (value == 16)
        return 0x0a;
        if (value == 17)
        return 0x07;
        if (value == 18)
        return 0x09;
        if (value == 19)
        return 0x12;
        if (value == 20)
        return 0x15;
        if (value == 21)
        return 0x16;
        if (value == 22)
        return 0x14;
        if (value == 23)
        return 0x18;
        if (value == 24)
        return 0x03;
        if (value == 25)
        return 0x19;
        if (value == 26)
        return 0x17;



      }
  });
