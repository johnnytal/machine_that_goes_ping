var menu = function(game){};
 
menu.prototype = {   
    create: function(){
        this.game.add.image(0, 50, 'machine_on');
        
        btnFree = this.game.add.sprite(-5, 0, 'freeBtn');
        btnGame = this.game.add.sprite(0, 0, 'gameBtn');
        btnGame.x = game.world.width - btnGame.width + 25;
        
        btnFree.y = game.world.centerY / 4 - btnFree.height / 2;
        btnGame.y = game.world.centerY / 4 - btnGame.height / 1.5;
        
        btnFree.angle = 15;
        btnGame.angle = 10;
        
        btnFree.inputEnabled = true;
        btnFree.events.onInputDown.add(function(){
            startFree();
        }, this); 
        
        btnGame.inputEnabled = true;
        btnGame.events.onInputDown.add(function(){
            startGame();
        }, this); 
        
        loadSounds();
                
        initAd();  
  
        try{
            window.plugins.insomnia.keepAwake();
        } catch(e){}
        
        setTimeout(function(){
            try{
                StatusBar.hide;
            } catch(e){}    
        }, 1000);
    }, 
};

function startGame(){
    game.state.start("Game");
    sfxclick.play();
}

function startFree(){
    game.state.start("Free");
    sfxclick.play();
}

function loadSounds(){  
    sfxBing = game.add.audio('bingSfx', 1, false);
    sfxMachine = game.add.audio('machineSfx', 1, false);
    sfxSwipeLeft = game.add.audio('swipeLeftSfx', 1, true);
    sfxclick = game.add.audio('clickSfx', 0.7, false);
}

function initAd(){
    var admobid = {};

    admobid = {
        //interstitial: 'ca-app-pub-9795366520625065/2870402631',
        banner: 'ca-app-pub-9795366520625065/7479840635'
    };

    if(AdMob) AdMob.createBanner({
       adId: admobid.banner,
       position: AdMob.AD_POSITION.BOTTOM_CENTER,
       autoShow: true
    });
    
    //if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}

