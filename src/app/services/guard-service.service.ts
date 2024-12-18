import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardServiceService {

  constructor(public http:HttpClient) { }
  public guardVal:boolean = false;

  ngOnInit(){
    this.http.get('http://localhost/projectEcommerce/auth.php', {withCredentials:true}).subscribe((response:any)=>{
      this.guardVal = response.status
      console.log(response.status)
    });
  }

}
