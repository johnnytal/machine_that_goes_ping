var gameMain = function(game){
    Pings = 1;

    watchID = null;
};

gameMain.prototype = {
    create: function(){  
        Pings = 1;
        
        machine = this.game.add.sprite(0, 50, 'machine_off0');
        
        btnMenu = this.game.add.sprite(-40, 100, 'mainBtn');
        btnMenu.inputEnabled = true;
        btnMenu.events.onInputDown.add(function(){
            sfxclick.play();
            if (sfxSwipeLeft.isPlaying){
                sfxSwipeLeft.stop();
            }
            game.state.start('Preloader');
        }, this); 
        btnMenu.alpha = 0.7;
        
        levelLabel = this.add.text(5, 5, 'Pings: ' + (Pings - 1), {
            font: '36px ' + font, fill: 'black', fontWeight: 'normal', align: 'center', stroke:'#ffffff', strokeThickness: 3
        });
        levelLabel.alpha = 0.6; 
        
        instructionsLabel = this.add.text(230, 100, 'Tap', {
            font: '24px ' + font, fill: 'black', fontWeight: 'normal', align: 'center', stroke:'#ffffff', strokeThickness: 3
        });
        instructionsLabel.alpha = 0.8;  
        instructionsLabel.anchor.set(0.5, 0.5); 
   
        pingImg2 = game.add.image(410, 80, 'ping');  
        pingImg2.alpha = 0.9;
        pingImg2.visible = false; 
        
        try{ mc.destroy(); }catch(e){}
        
        screen = document.getElementById('game');
        mc = new Hammer(screen);
        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL, threshold: 10 });
        mc.get('pinch').set({ enable: true });
        
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        
        window.addEventListener('deviceorientation', handleOrientation);
    },
    
    update: function(){
        if (Pings == 1 && game.input.activePointer.isDown){
            level_complete();
        }    
        
        if (Pings == 9 && game.input.pointer1.isDown && game.input.pointer2.isDown && game.input.pointer3.isDown){
            level_complete();
        }
    }
};

function level_complete(){
    btnMenu.inputEnabled = false;
    btnMenu.alpha = 0.5;

    sfxMachine.play();
    Pings++;
    
    setTimeout(function(){machine.kill(); machine = game.add.image(0, 50, 'machine_off1');}, WAIT_TIME);
    setTimeout(function(){machine.kill(); machine = game.add.image(0, 50, 'machine_off2');}, WAIT_TIME*2);
    setTimeout(function(){machine.kill(); machine = game.add.image(0, 50, 'machine_off3');}, WAIT_TIME*3);
    setTimeout(function(){machine.kill(); machine = game.add.image(0, 50, 'machine_on');}, WAIT_TIME*4);
    setTimeout(function(){
        play_ping();
    }, WAIT_TIME * 5 + 50);
}

function play_ping(){
     sfxBing.play();
     
     setTimeout(function(){
        pingImg2.visible = true;
     }, 200);
     
     setTimeout(function(){
        pingImg2.visible = false;
        machine.kill();
        machine = this.game.add.sprite(0, 50, 'machine_off0');  

        levelLabel.text = 'Pings: ' + (Pings - 1);
        
        next_level();

        btnMenu.inputEnabled = true;
        btnMenu.alpha = 0.7;
        btnMenu.bringToTop(); 
        
     }, WAIT_TIME);
}

function next_level(){
    if (Pings == 2){
        updateText('Swipe right', 317, 460, 0);
        
        mc.on("swiperight", function(ev) {
            if(!ev.handled && Pings == 2){
                level_complete();
            }
        });
    }
    
    else if (Pings == 3){
        updateText('As she says', 465, 471, 75);
        
        sfxSwipeLeft.play();

        mc.on("swipeleft", function(ev) {
            if(!ev.handled && Pings == 3){
               level_complete();
            }
        });
    }
    
    else if (Pings == 4){
        sfxSwipeLeft.stop();
        updateText('patience', 210, 455, 0);
        
        counter = setTimeout(function(){
            level_complete();
        }, WAIT_TIME * 10);
        
        machine.inputEnabled = true;
        machine.events.onInputDown.add(function(){
            clearTimeout(counter);
            
            counter = setTimeout(function(){
                level_complete();
            }, WAIT_TIME * 10);
        });
    }
    
    else if (Pings == 5){
        updateText('Tap 4', 235, 108, 87);
        
        levelLabel.inputEnabled = true;
        levelLabel.events.onInputDown.add(function(){
            level_complete();
        }, this); 
    }
    
    else if (Pings == 6){
        levelLabel.inputEnabled = false;
        
        var lightState;
        
        window.plugin.lightsensor.getReading(
            function success(reading){
                if (reading.intensity < 50){
                    lightState = 'on'; 
                }
                else{
                    lightState = 'off';
                }
                
                updateText('Lights ' + lightState, 308, 440, 12);
                
                timer = setInterval(function(){
                    window.plugin.lightsensor.getReading(
                        function success(reading){
                            if (Pings == 6 && 
                               ((lightState == 'on' && reading.intensity > 150) || 
                               (lightState == 'off' && reading.intensity < 5)))
                            {
                                level_complete();
                            }
                        }
                    );
                }, 1000);
            }, 
            
            function error(message){
                updateText('Got Lucky', 210, 455, 0);
                
                setTimeout(function(){
                    level_complete();   
                }, WAIT_TIME);
            }
        );
    }

    else if (Pings == 7){
        clearInterval(timer);
        
        window.addEventListener('deviceorientation', handleOrientation);
        
        updateText('Go West', 215, 425, 20);
    }
    
    else if (Pings == 8){
        navigator.compass.clearWatch(watchID);
        
        updateText('Z o   o    m   i n', 238, 435, 0);
        
        mc.on("pinchout", function(ev) {
            if(!ev.handled && Pings == 8){
               level_complete();
            }
        });
    }
    
    else if (Pings == 9){
        navigator.compass.clearWatch(watchID);

        updateText('3 fingers', 300, 440, -12);

    }
    
    else if (Pings == 10){
        
         updateText('kolme koneen klikkausta', 276, 430, -16);
        
         var clicks = 0;
     
         machine.inputEnabled = true;
         machine.events.onInputDown.add(function(){
             clicks++;
    
             if (clicks == 3){
                 level_complete();
             }
         });
    }
    
    else if (Pings == 11){
        machine.inputEnabled = false;
        updateText('upside down', 230, 430, 0);
        
        watchID2 = navigator.accelerometer.watchAcceleration(readAccel, onAccelError, { frequency: 20 });

    }
    
    else if (Pings == 12){
        navigator.accelerometer.clearWatch(watchID2);
        
        updateText('This was fun!', 260, 455, 5);
        
        setTimeout(function(){
            game_over();
        }, 5000);
    }
}

function handleOrientation(event){    
	beta = Math.round(event.beta);

    instructionsLabel.text = beta;
    
    if (beta < -90 && Pings == 11){
        level_complete();
    }
}

function compassSuccess(heading) {
    var head = heading.magneticHeading;
    
    if (Pings == 7 && head > 269 && head < 271){
        level_complete();
    }
}

function compassError(compassError){
    updateText('Got Lucky', 210, 455, 0);
    
    setTimeout(function(){
        level_complete();   
    }, WAIT_TIME);	
}

function game_over(){
    level_complete();
    updateText("You Won!\nHope you're proud of yourself.", 410, 50, 0);
}

function updateText(_text, _x, _y, _angle){
    instructionsLabel.text = _text;
    instructionsLabel.y = _y;
    instructionsLabel.x = _x;
    instructionsLabel.angle = _angle;
    instructionsLabel.bringToTop();    
}