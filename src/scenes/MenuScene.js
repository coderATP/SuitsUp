import { BaseScene } from "./BaseScene.js";
//import { AudioControl } from "../audio/AudioControl.js";
import { eventEmitter } from "../events/EventEmitter.js";

export class MenuScene extends BaseScene{
    constructor(config){
        super("MenuScene", config);
        this.config = config;
        this.clicked = true;
    }
    
    showInterface(){
        eventEmitter.destroy("TableSelectionToMenu")
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

        this.ui.menu_playBtn.addEventListener("click", ()=>{
            eventEmitter.emit("MenuToPlay");
        }) 
        this.ui.menu_optionsBtn.addEventListener("click", ()=>{
            eventEmitter.emit("MenuToOptions");
        })
        eventEmitter.once("MenuToPlay", ()=>{
            this.scene.start("TableSelectionScene");
        })
        this.tweens.add({
            targets: this.ui.menu_playBtn,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            duration: 1000
        })
    }
}