import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  public firstname:string = '';
  public lastname:string = ''
  public email:string = '';
  public password:string = '';
  public cbox:string = '';
  public failError:string = ''

  constructor(public http:HttpClient, public route:Router){}

  signUp(){
    let sellerCredentials = {
      firstname:this.firstname,
      lastname:this.lastname,
      email:this.email,
      password:this.password
    }
    console.log(sellerCredentials)
    this.http.post('http://localhost/projectEcommerce/seller_signup.php', sellerCredentials).subscribe((result:any)=>{
      console.log(result)
      if(result.status == true){
        this.failError = '';
        this.route.navigate(['/signin'])

      }else{
        this.failError = result.message;

      }
    }, (error:any)=>{
      console.log("Error Occured"+error)
    })
  }
 
}
