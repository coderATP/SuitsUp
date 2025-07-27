import { Table } from "./Table.js";
import { PlayerPile } from "../piles/PlayerPile.js";

export class TableFor4 extends Table{
    constructor(scene){
        super(scene);
        this.name = "tableFor4";
        this.enemy1Pile = new PlayerPile(this.scene, this.enemyNames[0]);
        this.enemy2Pile = new PlayerPile(this.scene, this.enemyNames[1]);
        this.enemy3Pile = new PlayerPile(this.scene, this.enemyNames[2]);
    }
    create(){
        //bottom
        this.playerPile.create(
            this.centerX - this.cardWidth/2,
            this.containerRect.bottom - this.cardHeight,
            this.cardWidth,
            this.cardHeight);
        //left
        this.enemy1Pile.create(
            this.containerRect.left,
            this.centreY - this.cardHeight/2,
            this.cardWidth,
            this.cardHeight);
        //top
        this.enemy2Pile.create(
            this.centerX - this.cardWidth/2,
            this.containerRect.top,
            this.cardWidth,
            this.cardHeight);
        //right
        this.enemy3Pile.create(
            this.containerRect.right - this.cardWidth,
            this.centreY - this.cardHeight/2,
            this.cardWidth,
            this.cardHeight);

        this.participants.unshift(this.enemy1Pile, this.enemy2Pile, this.enemy3Pile, this.playerPile);
        //create scoreboard
        this.scoreboard = this.hud.createScoreboard(this.participants);
        super.create();
        this.addCardToPiles(this.participants, this.marketPile);
        return this;
    }
    
}