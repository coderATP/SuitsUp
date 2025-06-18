import { PlayerPile } from "./piles/PlayerPile.js";
import { EnemyPile } from "./piles/EnemyPile.js";
import { FoundationPile } from "./piles/FoundationPile.js";

export class EleweNJewe{
    static CARD_BACK_FRAMES = [52, 53, 54, 55, 56];
    static CARD_VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    static CARD_START_FRAMES = {
        CLUB: 0,
        DIAMOND: 13,
        HEART: 26,
        SPADE: 39
    }
    static CARD_COLOURS = {
        CLUB: "BLACK",
        DIAMOND: "RED",
        HEART: "RED",
        SPADE: "BLACK"
    } 
    static CARD_SUITS = ["CLUB", "DIAMOND", "HEART", "SPADE"];
    constructor(scene){
        this.scene = scene;
        this.config = scene.config;
        this.playerPile = new PlayerPile(scene, "Peter");
        this.foundationPile = new FoundationPile(this.scene);
        this.opponentPiles = [];
        this.deck = [];
    }
    createDeck(){
        for(let i = 0; i < EleweNJewe.CARD_SUITS.length; ++i ){
            
            const startFrame = Object.values(EleweNJewe.CARD_START_FRAMES)[i];
            for(let j = 0; j < 13; ++j){
               const card = this.scene.createCard("null", 0, 0)
                   .setOrigin(0)
                   .setFrame(52)
                   .setDepth(0)
                   .setData({
                       frame: startFrame + j,
                       value: j+1,
                       suit: EleweNJewe.CARD_SUITS[i],
                       colour: Object.values(EleweNJewe.CARD_COLOURS)[i]
                   })
               this.deck.push(card);
            }
        }
    }
    
    shuffleDeck(){
        //shuffle card deck
        let tempDeck = [];
        while(this.deck.length){
            const randomPos = Math.floor(Math.random() * this.deck.length);
            const randomCard = (this.deck.splice(randomPos, 1))[0];
            tempDeck.push(randomCard);
        }
        this.deck = tempDeck;
        tempDeck = [];
        return this.deck;
    }
    
    getNumberOfOpponents(number){
        return number;
    }
    
    distributeDeckCardsToPiles(){
        const width = this.deck[0].displayWidth;
        const height = this.deck[0].displayHeight;
        this.foundationPile.create(this.config.width/2-width/2, this.config.height/2-height/2, width, height);
 
        let tempDeck = this.deck;
        //TO-DO: remove  cards from deck and place them into draw-pile
        //idea: get number of players, use that number to distribute the deck of cards evenly among them
        this.numberOfOpponents = this.getNumberOfOpponents(3);
        switch(this.numberOfOpponents){
            case 2:{
               /* const playerCards = tempDeck.splice(0, tempDeck.length/2);
                const enemyCards = tempDeck.splice(0, tempDeck.length);
                this.enemyPile = new EnemyPile(this.scene, "enemy1");

                this.playerPile.container.add(...playerCards);
                this.enemyPile.container.add(...enemyCards);
      */
            break;
            }
            case 3:{
                this.playerPile.create(this.config.width/2-width/2, this.config.height/2-height/2+200, width, height);
                this.enemy1Pile = new EnemyPile(this.scene, "opponent1").create(30, this.config.height/2-height/2-200, width, height);
                this.enemy2Pile = new EnemyPile(this.scene, "opponent2").create(this.config.width-width-30, this.config.height/2-height/2-200, width, height);
                this.opponentPiles.push(this.enemy1Pile, this.enemy2Pile);
                
                const playerCards = tempDeck.splice(0, Math.ceil(tempDeck.length/3));
                const enemy1Cards = tempDeck.splice(0, tempDeck.length/2);
                const enemy2Cards = tempDeck.splice(0, tempDeck.length);
                playerCards.forEach((card, i)=>{
                    card.setPosition(-i, -i*2)
                    .setFrame(card.getData("frame"))
                    .setName("playerCard")
                    .setInteractive({draggable: true})
                    card.setData({
                        frame: card.getData("frame"),
                        colour: card.getData("colour"),
                        value: card.getData("value"),
                        suit: card.getData("suit"),
                        x: card.x,
                        y: card.y,
                        cardIndex: i
                    });  
                })
                enemy1Cards.forEach((card, i)=>{
                    card.setPosition(i*1.5, -i)
                })
                enemy2Cards.forEach((card, i)=>{
                    card.setPosition(-i*1.5, -i)
                })
                this.playerPile.container.add(playerCards);
                this.enemy1Pile.container.add(enemy1Cards);
                this.enemy2Pile.container.add(enemy2Cards);
            
            break;
            }
            case 4:{
               /* const playerCards = tempDeck.splice(0, tempDeck.length/4);
                const enemy1Cards = tempDeck.splice(0, tempDeck.length/3);
                const enemy2Cards = tempDeck.splice(0, tempDeck.length/2);
                const enemy3Cards = tempDeck.splice(0, tempDeck.length);
 
                this.playerPile.container.add(playerCards);
                this.enemy1Pile.container.add(enemy1Cards);
                this.enemy2Pile.container.add(...enemy2Cards);
                this.enemy3Pile.container.add(...enemy3Cards); 
 */
            break;
            }
            default: {
                
                break;
            }
        }
    }
    
    newGame(){
        this.createDeck();
        this.deck = this.shuffleDeck();
        this.distributeDeckCardsToPiles();
    }
}