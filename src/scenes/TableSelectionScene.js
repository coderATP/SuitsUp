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
        const { MenuScene } = this.game.scene.keys;
        MenuScene.clicked = true;
        this.showInterface();
        // this.audio = new AudioControl(this);
        this.ui.tableSelection_submitBtn.addEventListener("click", ()=>{
            eventEmitter.emit("TableSelectionToPlay");
        }) 
        this.ui.tableSelection_backBtn.addEventListener("click", ()=>{
            eventEmitter.emit("TableSelectionToMenu");
        })
        eventEmitter.once("TableSelectionToPlay", ()=>{
            const form = document.getElementById("participants");
            
            Object.values(form.children).forEach(child=>{
                if(child.checked) this.checkedElement = child;
            })
            
            this.registry.set("numberOfOpponents", parseInt(this.checkedElement.value));
            this.scene.start("PlayScene");
        })
        eventEmitter.once("TableSelectionToMenu", ()=>{
            this.scene.start("MenuScene");
        }) 
    }
}