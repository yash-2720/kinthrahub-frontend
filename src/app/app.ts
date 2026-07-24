import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./features/authentication/login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

