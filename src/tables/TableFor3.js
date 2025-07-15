import { Table } from "./Table.js";
import { PlayerPile } from "../piles/PlayerPile.js";
import { EnemyPile } from "../piles/EnemyPile.js";
import { FoundationPile } from "../piles/FoundationPile.js";
import { MarketPile } from "../piles/MarketPile.js";


export class TableFor3 extends Table{
    constructor(scene){
        super(scene);
        this.name = "tableFor3";
        this.playerPile = new PlayerPile(this.scene, "player");
        this.enemy1Pile = new EnemyPile(this.scene, "enemy1");
        this.enemy2Pile = new EnemyPile(this.scene, "enemy2");
        this.foundationPile = new FoundationPile(this.scene, "foundation");
        this.marketPile = new MarketPile(this.scene, "market");
    }
    create(){
        this.playerPile.create(
            this.centerX - this.cardWidth/2,
            this.containerRect.bottom - this.cardHeight,
            this.cardWidth,
            this.cardHeight);
        this.enemy1Pile.create(
            this.containerRect.x + this.radius,
            this.containerRect.top,
            this.cardWidth,
            this.cardHeight);
        this.enemy2Pile.create(
            this.containerRect.right - this.cardWidth - this.radius,
            this.containerRect.top,
            this.cardWidth,
            this.cardHeight);
        [this.enemy1Pile, this.enemy2Pile].forEach(pile=>{
            pile.container.list.forEach(card=>{ card.setFrame(52) })
        })
        this.participants.push(this.playerPile, this.enemy1Pile, this.enemy2Pile);
        //create scoreboard
        this.scoreboard = this.hud.createScoreboard(this.participants);
        //create foundation pile
        this.foundationPile.create(
            this.centerX - this.cardWidth/2,
            this.centreY - this.cardHeight/2,
            this.cardWidth,
            this.cardHeight
        );
        //create market pile
        const playScreenRect = this.scene.playScreenTopUI.getBoundingClientRect();
        this.marketPile.create(
            playScreenRect.x,
            playScreenRect.y,
            this.cardWidth,
            this.cardHeight
        );  
        this.addCardToPiles(this.participants, this.marketPile);
        return this;
    }

}