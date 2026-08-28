// import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { RouterOutlet, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-main-layout',
//   imports: [
//     RouterOutlet,
//     RouterLink,
//     MatToolbarModule,
//     MatSidenavModule,
//     MatButtonModule,
//     MatListModule,
//     MatIconModule,
//   ],
//   templateUrl: './main-layout.html',
//   styleUrl: './main-layout.css',
// })
// export class MainLayout {
//   isExpanded = true;

//   // toggleSideNav(): void {
//   //   this.isExpanded = !this.isExpanded;
//   // }
//   toggleSideNav(): void {
//   this.isExpanded = !this.isExpanded;

//   // Let the width transition run, then nudge Material to re-measure
//   setTimeout(() => {
//     window.dispatchEvent(new Event('resize'));
//   }, 260); // slightly longer than your 250ms CSS transition
// }
// }

import { Component, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  constructor(private tokenService: TokenService) {}
  isExpanded = true;

  role: string | null = null;

  ngOnInit(): void {
    this.role = this.tokenService.getRole();
    console.log('Current Role:', this.role);
  }
  toggleSideNav(): void {
    this.isExpanded = !this.isExpanded;

    // Let the width transition run, then nudge Material to re-measure
    // the sidenav's actual width and update the content's margin-left
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 260); // slightly longer than the 250ms CSS transition
  }

  get isAdmin(): boolean {
    return this.role === 'ROLE_ADMIN';
  }

  get isEmployee(): boolean {
    return this.role === 'ROLE_EMPLOYEE';
  }

  get isPayrollAdmin(): boolean {
    return this.role === 'ROLE_PAYROLL_ADMIN';
  }
}
