import { Board } from "./Board";

export class Game{


    public board: Board = new Board(); 
    public boardSize: number = 9;
    public activePlayer: string = 'X';
    public  turnCount: number = 0;
    public isGameRunning: boolean = false;
    public winner: boolean = false;
    public isGameOver: boolean = false;
 
    
}