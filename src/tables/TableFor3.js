import { Table } from "./Table.js";
import { PlayerPile } from "../piles/PlayerPile.js";

export class TableFor3 extends Table{
    constructor(scene){
        super(scene);
        this.name = "tableFor3";
        this.enemy1Pile = new PlayerPile(this.scene, this.enemyNames[0]);
        this.enemy2Pile = new PlayerPile(this.scene, this.enemyNames[1]);
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

        this.participants.unshift(this.enemy1Pile, this.enemy2Pile, this.playerPile);
        //create scoreboard
        this.scoreboard = this.hud.createScoreboard(this.participants);
        super.create();
        this.addCardToPiles(this.participants, this.marketPile);
        return this;
    }

}