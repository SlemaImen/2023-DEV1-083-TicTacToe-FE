import { Component, EventEmitter, Input, OnDestroy } from '@angular/core';
import { GameService } from '../game.service'; 
import { Cell } from '../models/Cell';
import { Game } from '../models/Game';
import { Subscription } from 'rxjs';
 

@Component({
  selector: 'app-square',
  template: `
    <div class="cadre">
    <div 
      class="game-square rounded-lg border bg-teal-lightest 
      shadow-md " 
      (click)="changePlayer()" 
      [ngClass]="{noClick: game.winner} "
    >
      <p class="text-grey-darker"> {{square.state}} </p>
    </div></div>
   `,
  styles: [`
    .game-square { 
      height: 96%; 
      text-align: center;
      line-height: 0.85;
      cursor: pointer;
      background: #f2d024;
    }

    p { 
      display: inline;
      margin: 5px;
      font-size: 5rem;
      overflow: hidden;
    }
    .cadre{
      border: 2px solid #ebebf5;
    }
    .noClick {
      pointer-events: none;
    }`
  ]
})
export class SquareComponent implements OnDestroy{
  
  @Input() square: Cell = new Cell(0, "");
  @Input() game: Game = new Game();
  public isWinner: boolean = false;
  gameStatusChanged: EventEmitter<Game> = new EventEmitter<Game>();

  constructor(public gameService: GameService) {}

  ngOnDestroy(): void {}

  changePlayer() {
if(this.square.state == null){
      this.gameService.isWinner().subscribe((result) => {
        this.isWinner = result;
        if (!this.isWinner) {
          this.gameService.changePlayerTurn(this.square).subscribe((result) => {
            this.square.state = result.activePlayer;
            if (result.winner) {
              this.gameService.updateGameStatus(result);
            }
          });
        }
      });
    }
  }



}
