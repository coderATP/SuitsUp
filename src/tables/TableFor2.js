import { Table } from "./Table.js";
import { PlayerPile } from "../piles/PlayerPile.js";
import { EnemyPile } from "../piles/EnemyPile.js";

export class TableFor2 extends Table{
    constructor(scene){
        super(scene);
        this.name = "tableFor2";
        this.playerPile = new PlayerPile(this.scene, "Player");
        this.enemy1Pile = new EnemyPile(this.scene, this.enemyNames[0]);
    }
    create(){
        this.playerPile.create(
            this.containerRect.left + this.radius,
            this.containerRect.bottom - this.cardHeight,
            this.cardWidth,
            this.cardHeight);
        this.enemy1Pile.create(
            this.containerRect.right - this.cardWidth,
            this.containerRect.top,
            this.cardWidth,
            this.cardHeight);

        this.participants.push(this.playerPile, this.enemy1Pile);
        //create scoreboard
        this.scoreboard = this.hud.createScoreboard(this.participants);
        this.addCardToPiles(this.participants, this.marketPile);
        super.create();
        return this;
    }

}