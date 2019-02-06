var preloader = function(game){
    WAIT_TIME = 1000;
};
 
preloader.prototype = {
    preload: function(){ 
        progressTxt = this.progress = this.game.add.text(0, this.game.world.centerY - 30, '0%',{
             font: '32px', fill: 'darkgrey', fontWeight: 'normal', align: 'center'
        });
        progressTxt.x = this.game.world.centerX - progressTxt.width / 2;
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(0,  this.game.world.centerY - 150, "Loading...", {
            font: '24px', fill: 'grey', fontWeight: 'normal', align: 'center'
        });
        loadingTxt.x = this.game.world.centerX - loadingTxt.width / 2;
        
        game.load.image('machine_off0', 'assets/images/machine_off0.png');
        game.load.image('machine_off1', 'assets/images/machine_off1.png');
        game.load.image('machine_off2', 'assets/images/machine_off2.png');
        game.load.image('machine_off3', 'assets/images/machine_off3.png');
        game.load.image('machine_on', 'assets/images/machine_on.png');
        game.load.image('ping', 'assets/images/ping.png');
        
        game.load.image('freeBtn', 'assets/images/btn1.png');
        game.load.image('gameBtn', 'assets/images/btn2.png');
        game.load.image('mainBtn', 'assets/images/btn3.png');
        
        game.load.audio('bingSfx', 'assets/audio/bing.ogg');
        game.load.audio('machineSfx', 'assets/audio/machine.ogg');
        game.load.audio('swipeLeftSfx', 'assets/audio/swipeLeft.ogg');
        game.load.audio('clickSfx', 'assets/audio/click.ogg');
    },
    
    create: function(){
        game.state.start("Menu");
    }, 
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};