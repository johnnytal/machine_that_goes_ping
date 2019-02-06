var freeMain = function(game){
    simplePings = 0;
    texts = [
    	'Tap the machine\ngently',
    	"Good job!\nbet you couldn't\ndo that again",
    	"Wow,\nyou're a natural",
    	"You should try\nthe game mode",
    	"It contains\nsome interesting\nriddles",
    	"You like this\ndon't you?",
    	"Well I guess\nwe're gonna\nbe here awhile",
    	"I'm Johnny\nby the way",
    	"I'm a musician\nprogrammer\nPython fan",
    	"How 'bout giving\nthis 5 stars\non Google play?",
    	"I'd sure appreciate it",
    	"wondering how many\nof these\nI wrote ha?",
    	"Many there are\na thousand more...",
    	"You're gonna be\nhere all day?",
    	"Don't you\nhave a job?",
    	"Guess you could\nask the same\nabout me...",
    	"It's late.\nI should get\nsome sleep.",
    	"But...\nstill here...",
    	"I fart in your\ngeneral direction!",
    	"LOL, that was\na Python reference",
    	"If you want\nyou could mail me...",
    	"...and I'll just\nsend you all\nthe texts",
    	"really...\njohnnytal9@gmail.com",
    	"You're still here...\nAmazing.",
    	"there is no\nreward in the end",
    	"OK. So...\nwhat shall we discuss?",
    	"I love the\nPing sound!",
    	"blessed are the\ncheesemakers",
    	"I'm getting tired",
    	"mail me to\nget the answers\nto game mode",
    	"You tried game mode?",
    	"oh! visit my site!\nilyichgames.com",
    	"Google sucks.\nHehe.",
    	"OK, enough for now",
    	"I assume nobody\nwill get this far",
    	"Lorem ipsum",
    	"The answer\nto everything is...",
    	"42!",
    	"OK bye now",
    	"Really that's it",
    	"No more gags",
    	"Fin",
    	"The... end",
    	"...","...","...","...","OH COME ON!",
    	"OK! you win!",
		"You earned my respect",
		"bye now",
		"..."
    ];
};

freeMain.prototype = {
    create: function(){  
        Pings = 1;
        
        machine2 = this.game.add.sprite(0, 50, 'machine_off0');
        machine2.inputEnabled = true;
        machine2.events.onInputDown.add(function(){
            level_complete2();
        }, this); 
        
        btnMenu2 = this.game.add.sprite(-40, 150, 'mainBtn');
        btnMenu2.inputEnabled = true;
        btnMenu2.events.onInputDown.add(function(){
            sfxclick.play();
            game.state.start('Preloader');
        }, this); 
        btnMenu2.alpha = 0.7;
        
        levelLabel = this.add.text(5, 5, 'Pings: ' + simplePings, {
            font: '36px ' + font, fill: 'black', fontWeight: 'normal', align: 'center', stroke:'#ffffff', strokeThickness: 3
        });
        levelLabel.alpha = 0.6; 
        
        instructLabel = this.add.text(70, 90, 'Tap the machine\ngently', {
            font: '20px ' + font, fill: 'black', fontWeight: 'normal', align: 'center', stroke:'#ffffff', strokeThickness: 3
        });
        instructLabel.alpha = 0.8;  
        instructLabel.anchor.set(0.5, 0.5);  
        
        pingImg = game.add.image(410, 80, 'ping');  
        pingImg.alpha = 0.9;
        pingImg.visible = false;
    },
};

function level_complete2(){
    btnMenu2.inputEnabled = false;
    btnMenu2.alpha = 0.5;
    
    sfxMachine.play();
    simplePings++;

    setTimeout(function(){machine2.kill(); machine2 = game.add.image(0, 50, 'machine_off1');}, WAIT_TIME);
    setTimeout(function(){machine2.kill(); machine2 = game.add.image(0, 50, 'machine_off2');}, WAIT_TIME*2);
    setTimeout(function(){machine2.kill(); machine2 = game.add.image(0, 50, 'machine_off3');}, WAIT_TIME*3);
    setTimeout(function(){machine2.kill(); machine2 = game.add.image(0, 50, 'machine_on');}, WAIT_TIME*4);
    setTimeout(function(){
        play_ping2();
        instructLabel.text = texts[simplePings];
    }, WAIT_TIME * 5 + 50);
}

function play_ping2(){
     sfxBing.play();
     
     setTimeout(function(){
        pingImg.visible = true;
     }, 200);
     
     setTimeout(function(){
        pingImg.visible = false;
        machine2.kill();
        machine2 = this.game.add.sprite(0, 50, 'machine_off0'); 
        machine2.inputEnabled = true;
        machine2.events.onInputDown.add(function(){
            level_complete2();
        }, this);  

        levelLabel.text = 'Pings: ' + simplePings;

        btnMenu2.inputEnabled = true;
        btnMenu2.alpha = 0.7;
        btnMenu2.bringToTop(); 

     }, WAIT_TIME);
}