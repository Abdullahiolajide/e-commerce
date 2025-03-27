import { Component, inject } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.css'
})
export class AdditionalInfoComponent {
  constructor(private http:HttpClient){};
  public _formBuilder:any = inject(FormBuilder)

  
  
  firstFormGroup = this._formBuilder.group({
    phone_number: '',
  });
  secondFormGroup = this._formBuilder.group({
    address: '',
    zipcode: '',
  });
  isLinear = false;

  addInfo(){
    const additionalInfo = {
     ...this.firstFormGroup.value,
     ...this.secondFormGroup.value
    }
    console.log(additionalInfo)
    this.http.post('http://localhost/projectEcommerce/addInfo.php', additionalInfo, {withCredentials:true}).subscribe((response:any)=>{
      console.log(response)
    })
  }


}
