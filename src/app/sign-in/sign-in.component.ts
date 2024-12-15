import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  public email:string = '';
  public password:string = '';
  public failError:string = '';
  constructor(public http:HttpClient, public route:Router){}

  signIn(){
    let sellerInput = {
      email:this.email,
      password:this.password
    }

    this.http.post('http://localhost/projectEcommerce/seller_signin.php', sellerInput,  { withCredentials: true }).subscribe((result:any)=>{
      console.log(result)
      if(result.status == true){
        this.failError = '';
        this.route.navigate(['/seller_dashboard'])
        localStorage.setItem('token', '1')

      }else{
        this.failError = result.message;
        if(localStorage.getItem('token')){
          localStorage.removeItem('token')

        }


      }
    }, (error:any)=>{
      console.log(error)
    })
  }

}
