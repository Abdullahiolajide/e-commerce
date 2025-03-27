import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,  MatButtonModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customer-sign-up.component.html',
  styleUrl: './customer-sign-up.component.css'
})
export class CustomerSignUpComponent {
  constructor(public http:HttpClient, private _snackBar: MatSnackBar){}
  public formBuilder = inject(FormBuilder)
  signupGroup = this.formBuilder.group({
    firstname:'',
    lastname:'',
    email:'',
    password:''
  })
  openSnackBar(message:any, action:any) {
    this._snackBar.open(message, action, {
      duration: 4500
    });
  }
  signup(){
    this.http.post('http://localhost/projectEcommerce/customer_signup.php', this.signupGroup.value, {withCredentials:true}).subscribe((response:any)=>{
      console.log(response)
      this.openSnackBar(response.message, "OK")
    }, (error:any)=>{
      console.log(error)
    })
  }
}
