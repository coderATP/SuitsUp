import { Table } from "./Table.js";
import { PlayerPile } from "../piles/PlayerPile.js";
import { EnemyPile } from "../piles/EnemyPile.js";

export class TableFor3 extends Table{
    constructor(scene){
        super(scene);
        this.name = "tableFor3";
        this.playerPile = new PlayerPile(this.scene, "Player");
        this.enemy1Pile = new EnemyPile(this.scene, this.enemyNames[0]);
        this.enemy2Pile = new EnemyPile(this.scene, this.enemyNames[1]);
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
        super.create();
        this.addCardToPiles(this.participants, this.marketPile);
        return this;
    }

}