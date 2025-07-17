import { PlayerPile } from "../piles/PlayerPile.js";
import { EnemyPile } from "../piles/EnemyPile.js";
import { FoundationPile } from "../piles/FoundationPile.js";
import { MarketPile } from "../piles/MarketPile.js";


import { HUD } from "../hud/Hud.js";

export class Table{
    constructor(scene){
        this.scene = scene;
        this.config = scene.config;
        this.graphics = scene.graphics;
        this.participants = [];
        //enemy random names
        this.enemyNames = ["Bayo", "Ade", "Sola", "Billy", "Dele", "Wale"]
        this.enemyNames = scene.shuffle(this.enemyNames);
        
        this.cardWidth = this.scene.elewenjewe.deck[0].displayWidth;
        this.cardHeight = this.scene.elewenjewe.deck[0].displayHeight;
        
        this.marginX = this.config.width*0.025;
        this.width = this.height = this.config.width - this.marginX*2;
        this.marginY = this.config.height/2 - this.height/2;
        this.radius = 20;
        
        this.containerRect = new Phaser.Geom.Rectangle(
            this.marginX,
            this.marginY,
            this.width,
            this.height
        );
        //table centre
        this.centerX = (this.containerRect.left + this.containerRect.right)/2;
        this.centreY = (this.containerRect.top + this.containerRect.bottom)/2; 
        
        this.graphics.fillStyle(0x007700, 2)
        this.graphics.fillRoundedRect(
            this.containerRect.x,
            this.containerRect.y,
            this.containerRect.width,
            this.containerRect.height,
            this.radius
        );
        //piles
        this.foundationPile = new FoundationPile(scene, "foundation");
        this.marketPile = new MarketPile(scene, "Market");
        //HUD
        this.hud = new HUD(this.scene);
    }
    /*
    //NO MARKET
    addCardToPiles(participantsArray){
        const tempDeck = this.scene.elewenjewe.deck;
        for(let i = participantsArray.length; i > 0; --i){
            const pile = tempDeck.splice(0, tempDeck.length/i);
            participantsArray[i-1].container.add(pile);
            
            //set card info
            this.setCardsData(pile, participantsArray);
            
            //set card name
            pile.forEach((card, j)=>{
                card.setName(participantsArray[i-1].id+"Card")
            })
        }
        
        return this;
    }*/
    create(){
        //create market pile
        const marketSection = this.scene.ui.marketSection.getBoundingClientRect();
        const marketMiddle = marketSection.x + marketSection.width/2;
        this.marketPile.create(
            marketMiddle - this.cardWidth/2,
            marketSection.y,
            this.cardWidth,
            this.cardHeight
        );
        //create foundation pile 
        this.foundationPile.create(
            this.centerX - this.cardWidth/2,
            this.centreY - this.cardHeight/2,
            this.cardWidth,
            this.cardHeight
        );
    }
    addCardToPiles(participantsArray, market){
        const tempDeck = this.scene.elewenjewe.deck;
        for(let i = participantsArray.length; i > 0; --i){
            const pile = tempDeck.splice(0, 10);
            participantsArray[i-1].container.add(pile);
            
            //set card info
            this.setParticipantsCardsData(pile);
            
            //set card name
            pile.forEach((card, j)=>{
                card.setName(participantsArray[i-1].id+"Card")
            })
        }
        //add remaining cards to market pile and set data accordingly
        market.container.add(tempDeck);
        this.setMarketCardsData(market.container.list);
        return this;
    }
    setParticipantsCardsData(pile){
        pile.forEach((card, i)=>{
            card.setPosition(-i, -i)
            .setFrame(card.getData("frame"))
            .setInteractive({draggable: false})
            
            card.setData({
                frame: card.getData("frame"),
                colour: card.getData("colour"),
                value: card.getData("value"),
                suit: card.getData("suit"),
                x: card.x,
                y: card.y,
                cardIndex: i
            });
        });

        return this;
    }
    setMarketCardsData(pile){
        pile.forEach((card, i)=>{
            card.setPosition(0, -i*0.25)
            .setName("marketCard")
            .setFrame(52)
            .setInteractive({draggable: false})
            
            card.setData({
                frame: card.getData("frame"),
                colour: card.getData("colour"),
                value: card.getData("value"),
                suit: card.getData("suit"),
                x: card.x,
                y: card.y,
                cardIndex: i
            });
        });

        return this;
    } 
}