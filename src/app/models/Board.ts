import { Cell } from "./Cell";

 
export class Board{
  public cells: Cell[] = [];

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.cells.push(new Cell(i, ""));
    }
  }



}