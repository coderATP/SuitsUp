import { BaseScene } from "./BaseScene.js";
//import { AudioControl } from "../audio/AudioControl.js";
import { eventEmitter } from "../events/EventEmitter.js";

export class MenuScene extends BaseScene{
    constructor(config){
        super("MenuScene", config);
        this.config = config;
    }
    
    showInterface(){
      /*  const { PlayScene } = this.game.scene.keys;
        eventEmitter.destroy("ConfirmToTitle"); 
        eventEmitter.destroy("GameCompleteToMenu");
        this.hideAllScreens();
        this.showOne(this.titleScreen, "grid");
        this.scene.stop("PlayScene");
        if(PlayScene.audio) PlayScene.audio.playSong.stop();
        */
        this.hideAllScreens();
        this.showOne(this.menuScreen, "grid", 0);
    }
    create(){
        this.showInterface();
      //  this.audio = new AudioControl(this);
 
        this.title = this.add.image(0,0,"title").setOrigin(0).setScale(0.5);
        this.title.setPosition(this.config.width/2 - this.title.displayWidth/2, 10);
        this.startBtn = this.add.text(0,0,"PLAY",
        {font: "20px myFont"})
            .setOrigin(0)
            .setInteractive({draggable: false})
            .once("pointerdown", ()=>{
                
            })
        this.settingsBtn = this.add.text(0,0,"SETTINGS",
        {font: "20px myFont"})
            .setOrigin(0)
            .setInteractive({draggable: false})
            .once("pointerdown", ()=>{
                
            })
        this.startBtn.once("pointerdown", ()=>{
            eventEmitter.emit("MenuToPlay");
        }) 
        this.settingsBtn.once("pointerdown", ()=>{
            eventEmitter.emit("MenuToSettings");
        })
        eventEmitter.once("MenuToPlay", ()=>{
            this.scene.start("TableSelectionScene");  
        })
        this.tweens.add({
            targets: this.startBtn,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            duration: 1000
        })
        this.startBtn.setPosition(this.config.width/2-this.startBtn.displayWidth/2, this.config.height/2-60);
        this.settingsBtn.setPosition(this.config.width/2-this.settingsBtn.displayWidth/2, this.startBtn.y+this.startBtn.height+10);
    }
}