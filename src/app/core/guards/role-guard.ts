import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  const userRole = tokenService.getRole();

  const allowedRoles = route.data['roles'] as string[];

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  // router.navigate(['/dashboard']);
  // return false;
  return router.createUrlTree(['/dashboard']);
};