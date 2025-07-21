import { Table } from "./Table.js";
import { PlayerPile } from "../piles/PlayerPile.js";

export class TableFor2 extends Table{
    constructor(scene){
        super(scene);
        this.name = "tableFor2";
        this.enemy1Pile = new PlayerPile(this.scene, this.enemyNames[0]);
    }
    create(){
        this.playerPile.create(
            this.containerRect.left + this.radius,
            this.containerRect.bottom - this.cardHeight,
            this.cardWidth,
            this.cardHeight);
        this.enemy1Pile.create(
            this.containerRect.right - this.cardWidth - this.radius,
            this.containerRect.top,
            this.cardWidth,
            this.cardHeight);

        this.participants.push(this.playerPile, this.enemy1Pile);
        //create scoreboard
        this.scoreboard = this.hud.createScoreboard(this.participants);
        super.create();
        this.addCardToPiles(this.participants, this.marketPile);
        return this;
    }

}