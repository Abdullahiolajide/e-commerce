import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashboardGuardGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient)
  const router = inject(Router)

  return http.get('http://localhost/projectEcommerce/auth.php', {withCredentials:true}).toPromise().then((response:any)=>{
    console.log(response.status)
    if (response.status == false) {
      // router.navigate(['/signin'])
      
    }
    return response.status
  }).catch((error:any)=>{
    console.log(error)
    // router.navigate(['/signin'])
    return false
  })
};
