import { Component, EventEmitter} from '@angular/core';
import { GameService } from './game.service';
import { Game } from './models/Game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public game : Game= new Game();
  parentEmitter = new EventEmitter<Game>(); 
  public gameOver:Boolean = true;
  public winner:Boolean = false;

  constructor(public gameService: GameService) {       
      this.subscribeToGameStatus();
   }

  subscribeToGameStatus() {
     this.gameService.gameStatusChanged.subscribe((game: Game) => {
      this.game = game;
      this.gameOver = game.isGameOver; 
      this.checkWinner(); 
    }); 
  }


  /**
   * Check Winner X or O 
   */
  checkWinner() {
    this.gameService.isWinner().subscribe((result) => {
      this.winner = result;
      if (this.winner) {
        this.gameOver = true;
      }
    });
  }

/**
 * Reset the game
 */
  resetGame() {
     this.gameService.getNewGame().subscribe((res) => {
          this.game = res;
          this.gameOver = false;
          this.winner = false;
          this.game.activePlayer = 'X'; 
          this.game.board.cells = res.board.cells;   
   });
  }

  isGameOver() {
    this.gameService.isGameOver().subscribe(result => {
      this.gameOver = result;
    });
  }




}
