import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}


// │   ├── features
// │   │   ├── application-user
// │   │   ├── authentication
// │   │   ├── dashboard
// │   │   ├── donation-plan
// │   │   ├── donation-request
// │   │   ├── donation-transaction
// │   │   ├── employee
// │   │   ├── hospital
// │   │   └── payroll