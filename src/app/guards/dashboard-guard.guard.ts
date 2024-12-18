import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { GuardServiceService } from '../services/guard-service.service';

export const dashboardGuardGuard: CanActivateFn = (route, state) => {
  const gs = inject(GuardServiceService);
  const val = gs.guardVal
  gs.ngOnInit()
  return val;

 
};
