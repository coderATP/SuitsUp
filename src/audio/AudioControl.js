export class AudioControl{
    constructor(scene){
        this.menuSong = scene.sound.add('menuSong');
        this.playSong = scene.sound.add('playSong');
        this.playerWinSound = scene.sound.add('playerWinSound');
        this.opponentWinSound = scene.sound.add('opponentWinSound');
        this.gameCompleteSound = scene.sound.add('gameCompleteSound');

        this.menuSong.loop = true;
        
        this.buttonClickSound = scene.sound.add('buttonClickSound');
        //this.beginGameSound = scene.sound.add('beginGameSound');
        this.drawSound = scene.sound.add('drawSound');
        //this.dropSound = scene.sound.add('dropSound');
        //this.errorSound = scene.sound.add('errorSound');
        //this.undoSound = scene.sound.add('undoSound');
        //this.shuffleSound = scene.sound.add('shuffleSound');
        this.clockTickSound = scene.sound.add('clockTickSound');
        this.popUpSound = scene.sound.add('popUpSound');
        this.songs = [this.menuSong, this.playSong];
        this.sounds = [this.drawSound, this.popUpSound];
        //REDUCE VOLUME AT STARTUP, UNLESS OTHERWISE SPECIFIED BY USER
        this.songs.forEach(song=>{song.volume = 1;});
        this.sounds.forEach(sound=>{sound.volume = 1;});
        this.opponentWinSound.volume = 0.5;
        this.playSong.volume = 1;
        this.clockTickSound.volume = 0.3;
    }
    
    play(audio){
        audio.currentTime = 0;
        audio.play();
    }
    
    stop(audio){
        audio.currentTime = 0;
        audio.pause();
    }
    stopAllSongs(){
        this.songs.forEach(song=>{
            song.currentTime = 0;
            song.pause();
        })
    }
    
}