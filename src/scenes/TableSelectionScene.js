import { BaseScene } from "./BaseScene.js";
//import { AudioControl } from "../audio/AudioControl.js";
import { eventEmitter } from "../events/EventEmitter.js";

export class TableSelectionScene extends BaseScene{
    constructor(config){
        super("TableSelectionScene", config);
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
        this.showOne(this.tableSelectionScreen, "grid", 0);
    }
    create(){
        this.showInterface();
        // this.audio = new AudioControl(this);
        this.submitBtn = document.getElementById("ok");
        this.backBtn = document.getElementById("back");
        this.submitBtn.addEventListener("click", ()=>{
            eventEmitter.emit("ToPlay");
        }) 
        this.backBtn.addEventListener("click", ()=>{
            eventEmitter.emit("ToMenu");
        })
        eventEmitter.once("ToPlay", ()=>{
            this.registry.set("numberOfOpponents", 4);
            this.scene.start("PlayScene");  
        })
        eventEmitter.once("ToMenu", ()=>{
            this.scene.start("MenuScene");  
        }) 
    }
}