export class EnemyPile{
    constructor(scene, id){
        this.scene = scene;
        this.id = id;
        this.container = undefined;
    }
    create(x,y,w,h){
        console.log ("created enemy" + this.id + " pile");
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        
       //pile rectangle 
       this.rect = this.scene.createPileRect(x,y,w,h);
       //drop zone
       this.zone = this.scene.createDropZone(+this.id+"Zone", x,y,w,h);
       //container
       this.container = this.scene.add.container(x,y);
       //name
       this.name = this.scene.add.text(0,0, this.id, { fontSize: "16px", fontFamily: "Arial"} ).setOrigin(0)
       this.name.setPosition(x + w/2 -this.name.width/2, y+h); 
       return this; 
    }
}