import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../models/Game';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy{


 @Input()game:Game= new Game();
 @Input() eventEmitter!: EventEmitter<Game>; 
 private subscription!: Subscription; 
 

  constructor( public boardService: GameService ) {
  }

  ngOnInit(): void { 
  }

ngOnDestroy(): void { 
  this.subscription.unsubscribe(); 
} 

}
