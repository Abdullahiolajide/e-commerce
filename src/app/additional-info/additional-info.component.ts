import { Component, inject } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.css'
})
export class AdditionalInfoComponent {
  // constructor(private _formBuilder: FormBuilder) {}
  public _formBuilder:any = inject(FormBuilder)
  
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: '',
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
    thirdCtrl: '',
  });
  isLinear = false;

  addInfo(){
    const additionalInfo = {
      phone_number:this.firstFormGroup.firstCtrl,
      address:this.secondFormGroup.secondCtrl,
      zipcode:this.secondFormGroup.thirdCtrl
    }
    console.log(additionalInfo)
  }


}
