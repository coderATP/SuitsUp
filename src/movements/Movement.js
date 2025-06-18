export class Movement{
    constructor(scene, card){
        this.scene = scene;
        this.card = card;
        this.config = scene.config;
        this.graphics = scene.graphics;
    }
    
    execute(){}
    undo(){}
    redo(){}
}