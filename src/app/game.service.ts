import { EventEmitter, Injectable } from '@angular/core';
import { Cell } from './models/Cell';
import { Game } from './models/Game';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/api/game'; 
  gameStatusChanged: EventEmitter<Game> = new EventEmitter<Game>();


  constructor(private http: HttpClient) {
    this.getNewGame();
  }

  updateGameStatus(game: Game) {
    this.gameStatusChanged.emit(game);
  }

/**
 * 
 * @returns 
 */
  getNewGame(): Observable<Game> {
    return this.http.get<Game>(this.apiUrl + "/getNewGame");
  }
  
/**
 * 
 * @returns 
 */
getCells(): Observable<Cell[]> {
  return this.http.get<Cell[]>(this.apiUrl + "/getCells");
}


/**
 * 
 * @param squareClicked 
 * @returns 
 */
changePlayerTurn(squareClicked: Cell): Observable<Game> {
 let id =  squareClicked.id;
 let state= squareClicked.state;
 const url = `${this.apiUrl}/changePlayerTurn?id=${id}&state=${state}`;
  return this.http.get<Game>(url);
}

/**
 * 
 * @returns 
 */
isWinner(): Observable<boolean> {
  return this.http.get<boolean>(this.apiUrl + "/getWinner");
}

/**
 * 
 * @returns 
 */
isGameOver(): Observable<boolean> {
  return this.http.get<boolean>(this.apiUrl + "/getGameOver");
}

}