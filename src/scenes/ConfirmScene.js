import { BaseScene } from "./BaseScene.js";
import { eventEmitter } from "../events/EventEmitter.js";

export class ConfirmScene extends BaseScene{
    constructor(config){
        super("ConfirmScene", config);
        this.config = config;

    }
    
    showInterface(){
        this.hideMultiple([this.pauseScreen, this.levelCompleteScreen]);
        this.showOne(this.confirmScreen, "grid", 0)
    }

    create(){
        this.gamePaused = true;
        this.showInterface();
        this.handleConfirm();
    }
    handleConfirm(){
        let clicked = false;
        const { PreloadScene, PauseScene, PlayScene } = this.game.scene.keys;
        noBtn.addEventListener("click", ()=>{
            eventEmitter.emit("ConfirmToPause");
        })
        yesBtn.addEventListener("click", ()=>{
            if(PlayScene.ui.confirmText.innerText === "Return to Menu?") eventEmitter.emit("ConfirmToMenu");
        
            else if(PlayScene.ui.confirmText.innerText === "Restart?") eventEmitter.emit("ConfirmToRestart");
        }) 
        eventEmitter.once("ConfirmToPause", ()=>{
            PreloadScene.audio.popUpSound.play();
            this.scene.start("PauseScene");
        })
        eventEmitter.once("ConfirmToMenu", ()=>{
            PreloadScene.audio.popUpSound.play();
            this.scene.start("MenuScene");
        })

        eventEmitter.once("ConfirmToRestart", ()=>{
            PreloadScene.audio.popUpSound.play();
            this.hideOne(this.confirmScreen);
            PlayScene.watch.resetWatch(PlayScene.ui.timeText).setUpWatch(PlayScene.ui.timeText);
            this.scene.stop();
            PlayScene.elewenjewe.table.participants.forEach(participant=>{
                while(participant.container.length) participant.container.list.pop();
            })
            while(PlayScene.elewenjewe.table.foundationPile.container.length){
                PlayScene.elewenjewe.table.foundationPile.container.list.pop();
            }
            while(PlayScene.elewenjewe.table.marketPile.container.length){
                PlayScene.elewenjewe.table.marketPile.container.list.pop();
            }
            PlayScene.elewenjewe.onRestart();
            //setTimeout(()=>{this.scene.resume('PlayScene')}, 1)
           
        })  
    
    }

}