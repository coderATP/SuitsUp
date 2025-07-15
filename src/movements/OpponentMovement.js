import { Movement } from "./Movement.js";
import { CommandHandler } from "../CommandHandler.js";
import { PlayerMovement } from "./PlayerMovement.js";
import { FoundationMovement } from "./FoundationMovement.js";


export class Enemy1Movement extends Movement{
    constructor(scene, card){
        super(scene, card);
        this.id = "enemy1Movement";
        this.targetX = this.targetY = 0;
    }
    
    execute(){
        const sourcePile = this.scene.elewenjewe.enemy1Pile.container;
        const targetPile = this.scene.elewenjewe.foundationPile.container;
        this.targetY = targetPile.y - sourcePile.y;
        this.targetX = targetPile.x - sourcePile.x;
        targetPile.setDepth(0); sourcePile.setDepth(1); 
        this.scene.tweens.add({
            targets: this.card,
            y: this.targetY,
            x: this.targetX,
            onComplete: ()=>{
                const card = this.scene.createCard("foundationCard")
                    .setInteractive({draggable: false})
                    .setFrame(this.card.getData("frame"));
                card.setData({
                    x: card.x,
                    y: card.y,
                    sourceZone: "enemy1Zone",
                    frame: this.card.getData("frame"),
                    suit: this.card.getData("suit"),
                    colour: this.card.getData("colour"),
                    value: this.card.getData("value")
                });
                
                targetPile.add(card);
                targetPile.list.forEach((card, i)=>{
                    card.setPosition(0, -i)
                    card.setData({x: card.x, y: card.y})
                })
                
                this.originalCardData = {
                    x: this.card.x,
                    y: this.card.y,
                    cardIndex: sourcePile.length,
                    frame: this.card.getData("frame"),
                    value: this.card.getData("value"),
                    suit: this.card.getData("suit"),
                    colour: this.card.getData("colour"), 
                } 
                sourcePile.list.pop();
            }
        })
    }
    
    undo(command){
        if(!command.originalCardData) return;
        const sourcePile = this.scene.elewenjewe.foundationPile.container;
        const targetPile = this.scene.elewenjewe.enemy1Pile.container;
        targetPile.setDepth(0); sourcePile.setDepth(1); 
 
        const card = sourcePile.list[sourcePile.length-1];
        
        this.scene.tweens.add({
            targets: card,
            y: targetPile.y - sourcePile.y,
            x: targetPile.x - sourcePile.x,
            onComplete: ()=>{
                const card = this.scene.createCard("enemy1Card")
                    .setInteractive({draggable: false})
                    .setPosition(-targetPile.length, -2*targetPile.length)
                    .setFrame(command.originalCardData.frame);
                card.setData({
                    x: card.x,
                    y: card.y,
                    frame: command.originalCardData.frame,
                    suit: command.originalCardData.suit,
                    colour: command.originalCardData.colour,
                    value: command.originalCardData.value
                });
                
                targetPile.add(card);
                sourcePile.list.pop();
            }
        }) 
    }

}  