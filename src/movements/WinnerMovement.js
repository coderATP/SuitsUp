import { Movement } from "./Movement.js";
import { FoundationToMarketMovement } from "./FoundationToMarketMovement.js";
import { MarketMovement } from "./MarketMovement.js";
import { PlayerMovement } from "./PlayerMovement.js";


export class WinnerMovement extends Movement{
    constructor(scene, sourcePile, nextPileToDeal){
        super(scene);
        this.id = "playerMovement";
        this.sourcePile = sourcePile;
        this.nextPileToDeal = nextPileToDeal;
        this.table = this.scene.elewenjewe.table;
        this.winnerDealCountToWin = 1;
    }
    
    execute(){
        //if(!this.card) return;
        const sourcePile = this.sourcePile;
        const targetPile = this.table.foundationPile;
        if(!sourcePile.container.length){
            alert("last winner pile empty");
            return;
        }
        this.card = sourcePile.container.list[sourcePile.container.length-1];
        this.targetY = targetPile.y - sourcePile.y;
        this.targetX = targetPile.x - sourcePile.x;
       
        targetPile.container.setDepth(0); sourcePile.container.setDepth(1); 
        this.scene.tweens.add({
            targets: this.card,
            y: this.targetY,
            x: this.targetX,
            duration: 1000,
            onComplete: ()=>{
                const card = this.scene.createCard(targetPile.id+"Card")
                    .setInteractive({draggable: false})
                    .setFrame(this.card.getData("frame"));
                card.setData({
                    x: card.x,
                    y: card.y,
                    sourceZone: sourcePile.id+"Zone",
                    frame: this.card.getData("frame"),
                    suit: this.card.getData("suit"),
                    colour: this.card.getData("colour"),
                    value: this.card.getData("value")
                });
                
                targetPile.container.add(card);
                card.setPosition(0, 0);
                card.setData({x: card.x, y: card.y}) 
                sourcePile.container.list.pop();
                
                //OPTION A: SOMEONE WINS
                const cardBelow = targetPile.container.list[targetPile.container.length-1];
                const cardTop = targetPile.container.list[targetPile.container.length-2];
                if(targetPile.container.length > 3 &&
                    cardTop.getData("suit") === cardBelow.getData("suit") 
                ){
                    alert(sourcePile.id + " wins!!!")
                }
                //OPTION B: NOBODY WINS
                else{
                    if(this.winnerDealCountToWin < 1){
                        this.execute();
                        this.winnerDealCountToWin++;
                    }
                    else{
                        alert("sorry, " + sourcePile.id + "☹️, send foundation cards to market");
                        const command = new FoundationToMarketMovement(this.scene);
                        this.scene.commandHandler.execute(command);
                        setTimeout(()=>{
                            const command = new MarketMovement(this.scene, this.nextPileToDeal);
                            this.scene.commandHandler.execute(command); 
                        }, 1100);
                        setTimeout(()=>{
                            const command = new PlayerMovement(this.scene);
                            this.scene.commandHandler.execute(command); 
                        }, 2200) 
                    }
                    
                } 
            }
        })
    }
}