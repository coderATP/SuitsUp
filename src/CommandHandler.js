export class CommandHandler{
    constructor(scene){
        this.scene = scene;
        //tracking undo and redo actions 
        this.moves = [];
        this.totalMoves = 0;
        this.movesToRedo = 0;
        this.movesToUndo = 0;
    }
    
    execute(command){
        
        command.execute();
        this.moves.push(command);
        this.movesToUndo++;
        this.movesToRedo = 0;
    }
    
    undo(){
        if(this.movesToUndo === 0) return;
        const command = this.moves.pop();

        if(!command) return;
        console.log (command.id)
        if(command.id === "playerMove"){
           // new PlayerMovement(this.scene, null, null).undo();
            this.movesToUndo--;
        }

        else if(command.id === "opponentMove"){
           // new OpponentMovement(this.scene, null, null).undo();
            this.movesToUndo--;
        } 
    
    }
}