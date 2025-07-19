import { Movement } from "./Movement.js";

export class FoundationMovement extends Movement{
    constructor(scene, targetPile, card){
        super(scene, card);
        this.id = "foundationMovement";
        this.targetPile = targetPile;
        this.table = this.scene.elewenjewe.table;
    }
    
    execute(){
        const sourcePile = this.table.foundationPile;
        const targetPile = this.targetPile;

        for(let i = 0; i < sourcePile.container.length; ++i){

            const originalCard = sourcePile.container.list[i];
            this.scene.tweens.add({
                targets: originalCard,
                y: targetPile.y - sourcePile.y,
                x: targetPile.x - sourcePile.x,
                duration: 500,
                ease: "Quadratic",
                onComplete: ()=>{
                    const card = this.scene.createCard(targetPile.id+"Card", originalCard.getData("x"), originalCard.getData("y"))
                        .setInteractive({draggable: false})
                        .setFrame(52)
                    card.setData({
                        x: card.x,
                        y: card.y,
                        frame: originalCard.getData("frame"),
                        suit: originalCard.getData("suit"),
                        colour: originalCard.getData("colour"),
                        value: originalCard.getData("value")
                    });
                
                    targetPile.container.addAt(card, 0);
                    //set position of new card
                    targetPile.container.list.forEach((card, i)=>{
                        card.setPosition(-i, -i*2)
                        card.setData({x: card.x, y: card.y})
                        if(targetPile.id === "Player") card.setFrame(card.getData("frame"))
                        
                    })
                    //destroy original card
                    originalCard.destroy();
                }
            });
            
        }
    }
}