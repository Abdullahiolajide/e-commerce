import { CanActivateFn } from '@angular/router';

export const dashboardGuardGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token')
 if (token) {
  return true;

  }else{
    return false;
  }
 
};
