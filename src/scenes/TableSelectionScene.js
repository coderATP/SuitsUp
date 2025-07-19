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
    /*restricted*/
    getCheckedRadioElementFromGrandParentDiv(div){
        const grandparentDiv = document.getElementById(div);
        let checkedRadioElement = undefined;
        Object.values(grandparentDiv.children).forEach(parentDiv=>{
            Object.values(parentDiv.children).forEach(radioInput=>{
                if(radioInput.checked) checkedRadioElement = radioInput; 
            })
        })
        return checkedRadioElement;
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
            const numberOfOpponents = this.getCheckedRadioElementFromGrandParentDiv("participants").value;
            const difficulty = this.getCheckedRadioElementFromGrandParentDiv("difficulties").value;
            const gameMode = this.getCheckedRadioElementFromGrandParentDiv("gameModes").value;
            
            this.registry.set("numberOfOpponents", parseInt(numberOfOpponents));
            this.registry.set("difficulty", difficulty);
            this.registry.set("gameMode", gameMode);

            this.scene.start("PlayScene");
        })
        eventEmitter.once("TableSelectionToMenu", ()=>{
            this.scene.start("MenuScene");
        }) 
    }
}