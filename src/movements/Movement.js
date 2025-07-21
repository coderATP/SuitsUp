export class Movement{
    constructor(scene){
        this.scene = scene;
        this.config = scene.config;
        this.graphics = scene.graphics;
    }
    
    execute(){}
    undo(){}
    redo(){}
}