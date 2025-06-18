import { Movement } from "./Movement.js";

export class PlayerMovement extends Movement{
    constructor(scene, card){
        super(scene, card);
        this.id = "playerMovement";
    }
    
    execute(){
        const sourcePile = this.scene.elewenjewe.playerPile.container;
        const targetPile = this.scene.elewenjewe.foundationPile.container;
       targetPile.setDepth(1); sourcePile.setDepth(0); 
 
        this.scene.tweens.add({
            targets: this.card,
            y: -200,
            x: 0,
            onComplete: ()=>{
                const card = this.scene.createCard("foundationCard")
                    .setInteractive({draggable: false})
                    .setFrame(this.card.getData("frame"));
                card.setData({
                    frame: this.card.getData("frame"),
                    suit: this.card.getData("suit"),
                    colour: this.card.getData("colour"),
                    value: this.card.getData("value")
                });
                
                targetPile.add(card);
                targetPile.list.forEach((card, i)=>{
                    card.setPosition(i*2, -i)
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
        const targetPile = this.scene.elewenjewe.playerPile.container;
       targetPile.setDepth(1); sourcePile.setDepth(0); 
 
        const card = sourcePile.list[sourcePile.length-1];
        
        this.scene.tweens.add({
            targets: card,
            y: 200 - (2*targetPile.length),
            x: -targetPile.length,
            onComplete: ()=>{
                const card = this.scene.createCard("playerCard")
                    .setInteractive({draggable: false})
                    .setPosition(-targetPile.length, -2*targetPile.length)
                    .setFrame(command.originalCardData.frame);
                card.setData({
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