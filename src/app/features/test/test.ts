import { Component } from "@angular/core";

@Component({
  selector: 'app-test',
  template: `
    <button (click)="load()">Load</button>

    <h1>{{ names.length }}</h1>

    @for(name of names; track name){
      <p>{{name}}</p>
    }
  `
})
export class TestComponent {

  names:string[]=[];

  load(){
      this.names=["A","B","C"];
  }

}