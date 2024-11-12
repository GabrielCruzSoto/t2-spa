// src/app/guards/auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Aquí asumimos que el token JWT se guarda en localStorage

  if (token) {
    
    const requiredRole = route.data?.['role'];
    const userRole = getUserRoleFromToken(token);

    if (!requiredRole || requiredRole === userRole) {
      return true; 
    } else {
      router.navigate(['/home']); 
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};

function getUserRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (e) {
    console.error('Error decoding token', e);
    return null;
  }
}
