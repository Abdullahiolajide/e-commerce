import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,  MatButtonModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customer-sign-in.component.html',
  styleUrl: './customer-sign-in.component.css'
})
export class CustomerSignInComponent {
  constructor(public http:HttpClient, private _snackBar: MatSnackBar, private route: Router){}
    public formBuilder = inject(FormBuilder)
    signinGroup = this.formBuilder.group({
      email:'',
      password:''
    })
    openSnackBar(message:any, action:any) {
      this._snackBar.open(message, action, {
        duration: 4500
      });
    }
    signin(){
      this.http.post('http://localhost/projectEcommerce/customer_signin.php', this.signinGroup.value, {withCredentials:true}).subscribe((response:any)=>{
        console.log(response) 
        if (response.status) {
          this.route.navigate(['/checkout'])
        }
        this.openSnackBar(response.message, "OK")
      }, (error:any)=>{
        console.log(error)
      })
    }
}
