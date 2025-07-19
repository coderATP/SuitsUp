import { Movement } from "./Movement.js";
import { CommandHandler } from "../CommandHandler.js";
import { FoundationMovement } from "./FoundationMovement.js";
import { MarketMovement } from "./MarketMovement.js";

export class PlayerMovement extends Movement{
    constructor(scene, card){
        super(scene, card);
        this.id = "playerMovement";
        this.targetX = 0;
        this.targetY = -200;
        this.table = this.scene.elewenjewe.table;
        this.lastIndexToDeal = -1;
        this.scene = scene;
        this.tempParticipants = this.table.participants.slice();
 
    }
    
    determineEndOfRoundScore(data, winnerPile){
        const score = this.table.foundationPile.container.length;
        const winner = winnerPile.id;
        data.forEach(cell=>{
            if(cell.id === winnerPile.id){
                cell.innerHTML = parseInt(cell.innerHTML) + score;
            }
        })
        return {winner, score};
    }
    
    execute(){
        //A RECURSIVE FUNCTION: keeps calling itself
        this.scene.commandHandler.playing = true;
        this.lastIndexToDeal++;
        
        const targetPile = this.table.foundationPile;
        let sourcePile = this.tempParticipants[this.lastIndexToDeal];

        //access indicator
        const indicator = this.table.playerPile.dealerIndicator;
        indicator.moveToNextDealer(sourcePile);
        
        //REVEAL CARD OF PARTICIPANT ONLY WHEN IT'S TIME TO DEAL
        const topCard = sourcePile.container.list[sourcePile.container.length-1];
        if(topCard) topCard.setFrame(topCard.getData("frame"));
        
        if(sourcePile) this.card = sourcePile.container.list[sourcePile.container.length - 1];
        
        targetPile.container.setDepth(0);
        if(sourcePile) sourcePile.container.setDepth(1);

        const tween = this.scene.tweens.add({
            targets: this.card,
            x: targetPile.x - sourcePile.x,
            y: targetPile.y - sourcePile.y,
            duration: 1000,
            ease: "Quadratic",
            onComplete: ()=>{
                //create new card
                const card = this.scene.createCard("foundationCard")
                        .setInteractive({draggable: false})
                        .setFrame(this.card.getData("frame"));
                card.setData({
                        x: card.x,
                        y: card.y,
                        id: targetPile.id,
                        sourceID: sourcePile.id,
                        frame: this.card.getData("frame"),
                        suit: this.card.getData("suit"),
                        colour: this.card.getData("colour"),
                        value: this.card.getData("value")
                });
                //add new card to target pile
                targetPile.container.add(card);
                //set position of new card
                targetPile.container.list.forEach((card, i)=>{
                        card.setPosition(0, -i*2)
                        card.setData({x: card.x, y: card.y})
                })
                sourcePile.container.list.pop();

                //NEXT MOVE
                //OPTION A: SOMEONE WINS
                const cardBelow = targetPile.container.list[targetPile.container.length-1];
                const cardTop = targetPile.container.list[targetPile.container.length-2];
                if(targetPile.container.length > 1 &&
                        cardTop.getData("suit") === cardBelow.getData("suit") 
                ){
                    //update scoreboard
                    const winnerScore = this.determineEndOfRoundScore(this.scene.elewenjewe.data, sourcePile);
                    
                    // alert("winner: "+sourcePile.id);
                    const arr = this.tempParticipants.splice(0, this.lastIndexToDeal);
                    this.tempParticipants.push(...arr);
                        
                    const command = new FoundationMovement(this.scene, sourcePile);
                    this.scene.commandHandler.execute(command);

                    setTimeout(()=>{
                            this.lastIndexToDeal = -1; 
                            this.execute();
                    }, 1200);
                }
                //OPTION B: NOBODY WINS
                else{
                    this.continueDealing();
                }
            }
        }) 
    }
    
    resetDealerIndexIfNobodyWins(){
        if(this.lastIndexToDeal >= this.table.participants.length-1){
            this.lastIndexToDeal = -1;
        } 
    }
    continueDealing(){
        //first player deals again if nobody wins 
        this.resetDealerIndexIfNobodyWins();
        let nextPileToDeal = this.tempParticipants[this.lastIndexToDeal+1];
        //but first check if next pile is empty
        //if empty, move a card from market to it,
        //then resume executing/dealing
        if(nextPileToDeal.container.length === 0){
            //deal from market
            const command = new MarketMovement(this.scene, nextPileToDeal);
            this.scene.commandHandler.execute(command);
            //wait (for 1 sec) till card arrives from market, then deal
            setTimeout(()=>{
                //after arriving from market,
                    if(nextPileToDeal.id === "Player"){
                        //allow (internal) card swapping to favour player
                        this.swapPlayerCardsBasedOnDifficultyLevel();
                        const playerPileTopmostCard = this.table.playerPile.container.list[this.table.playerPile.container.list.length - 1];
                        //allow player to click card before executing
                        playerPileTopmostCard.once("pointerdown", ()=>{ this.execute() })
                }
                else this.execute();    
            }, 1100)
        }
        //if not empty, just keep dealing
        else{
            if(nextPileToDeal.id === "Player"){
                //allow (internal) card swapping to favour player
                this.swapPlayerCardsBasedOnDifficultyLevel();
                const playerPileTopmostCard = this.table.playerPile.container.list[this.table.playerPile.container.list.length - 1];
                //allow player to click card before executing
                playerPileTopmostCard.once("pointerdown", ()=>{ this.execute() })
            }
            else this.execute();   
        }
    }
    
    swapPlayerCardsBasedOnDifficultyLevel(){
        const { elewenjewe } = this.scene;
        const randomNumber = Math.random();
        
        switch(elewenjewe.difficulty){
            case "easy":{
                randomNumber < 0.85 && this.scene.swapPlayerTopCard();
              break;
            }
            case "normal":{
                randomNumber < 0.65 && this.scene.swapPlayerTopCard(); 
              break;
            } 
            case "hard": {
                randomNumber < 0.45 && this.scene.swapPlayerTopCard();
                break;
            }
            case "legend": {
                randomNumber < 0.25 && this.scene.swapPlayerTopCard();
                break;
            }
            case "hell": {
               // randomNumber < 0 && this.scene.swapPlayerTopCard();
                break;
            }
            default: {break;}
        }
        
    }
} 