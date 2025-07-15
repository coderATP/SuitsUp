import { BaseScene } from "./BaseScene.js";
//command handler for card movements
import { CommandHandler } from "../CommandHandler.js";
//movements
import { PlayerMovement } from "../movements/PlayerMovement.js";
import { EleweNJewe } from "../Elewe-n-Jewe.js";
import { eventEmitter } from "../events/EventEmitter.js";


export class PlayScene extends BaseScene{
    constructor(config){
        super("PlayScene", config);
        this.config = config;
        this.commandHandler = new CommandHandler(this);
        this.elewenjewe = new EleweNJewe(this);
 
    }
    
    showInterface(){
        eventEmitter.destroy("TableSelectionToPlay");
        this.hideAllScreens();
        this.showOne(this.playScreen, "grid", -1);
    }
    createCard(type, x, y){
        const card =  this.add.image(x,y,"cards").setName(type).setOrigin(0).setScale(this.config.zoomFactor);
        return card
    }
    createPileRect(x, y, w, h){
        const rect = new Phaser.Geom.Rectangle(x, y, w, h);
        this.graphics.strokeRectShape(rect);
        return rect;
    }
    createDropZone(zoneType, x, y, w, h){
        const zone = this.add.zone(x, y, w, h).setRectangleDropZone(w+30, h+30).setDepth(-2)
        .setName(zoneType).setOrigin(0);
        if(this.config.debug){
            this.add.rectangle(x, y, w, h, 0x09144ff, 0.0).setDepth(200).setOrigin(0);
        }
        return zone;
    }
    
    handleDragEvent(){
        this.input.on("drag", (pointer, gameobject, dragX, dragY)=>{
            //change position for a single card
            gameobject.setPosition(dragX, dragY);
            //change position for a stack of cards from tableau 

        })
        this.input.on("dragend", (pointer, gameobject, dropped)=>{
          //  gameobject.setPosition(gameobject.getData("x"), gameobject.getData("y")); 
           //for invalid moves, snap back to original location
        })
        return this;
    }
    
    handleDropEvent(){
        this.input.on("drop", (pointer, gameobject, dropZone)=>{
           gameobject.setDepth(0).setAlpha(1);
            switch(dropZone.name){
                //FOUNDATION DROP ZONE
                case "playerZone":{
                    //discard to foundation
                break;
                }
                //TABLEAU DROP ZONE
                case "enemyZone":{
                    //discard to tableau 
                break;
                }
                //DISCARD PILE ZONE
                case "foundationZone":{
                    //tableau to discard
                break;
                }
            }
        })
        return this;
    }
    
    handleClickEvent(){

        //TO-DO: move a card from draw-pile to discard-pile on clicking the draw-pile
        this.input.on("pointerdown", (pointer, gameobject)=>{
            //return if click on empty space
            if(!gameobject[0]) return;
            if(gameobject[0].name === "playerCard"){
                if(this.commandHandler.playing) return;
               // alert ("player bout to deal")
                const command = new PlayerMovement(this, gameobject[0]);
                this.commandHandler.execute(command);
            }
        })
        return this;
    }
    
    create(){
        this.showInterface();
        //graphics creation
        this.graphics = this.add.graphics({lineStyle:  {width: 1, color: "0xffffff"} })
        //game
        this.elewenjewe.newGame();

        //events
       this.handleDragEvent().handleDropEvent().handleClickEvent();
    }
    update(time, delta){

    }
}