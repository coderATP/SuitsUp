export class DealerIndicator extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y){
        super(scene, x, y, "chip");
        this.scene = scene;
        scene.add.existing(this);
        
        this.init();
    }
    
    init(){
        this.setOrigin(0).setDepth(2).setScale(0.125);
    }
    moveToNextDealer(sourcePile){
        this.scene.tweens.add({
            targets: this,
            x: sourcePile.x,
            y: sourcePile.y,
            ease: "Cubic",
            duration: 10,
            tint: 0x4e342e,
            onComplete: ()=>{ this.clearTint(); }
        })
    }
}