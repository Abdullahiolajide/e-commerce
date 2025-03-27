import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidenavComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private http:HttpClient, private _snackBar: MatSnackBar){}
  public profileInfo:any = {}
  public sName:string = '';
  public showEditBtn:boolean = false;
  public email:string = ''
  public phoneNumber:string = ''
  public address:string = ''
  public zipcode:string = ''

  ngOnInit(){
    this.http.get('http://localhost/projectEcommerce/get_profile.php', {withCredentials:true}).subscribe((result:any)=>{
      this.profileInfo = result.profile_info;
      this.sName = this.profileInfo.firstname+" "+this.profileInfo.lastname
      this.email = result.profile_info.email
      this.phoneNumber = result.profile_info.phone_number
      this.address = result.profile_info.address;
      this.zipcode = result.profile_info.zipcode
    })
  }
  openSnackBar(message: string, action: string) {
    
  }

  showEdit(){
    this.showEditBtn = true
  }
  saveChanges(){
    const values = {
      email:this.email,
      phoneNumber:this.phoneNumber,
      address:this.address,
      zipcode:this.zipcode
    }
    console.log(values)
    

    this.http.post('http://localhost/projectEcommerce/edit_profile.php', values, {withCredentials:true}).subscribe((response:any)=>{
      console.log(response)
      this._snackBar.open("Edited Succesfully", "OK");
      this.showEditBtn = false
      
    }, (error:any)=>{
      this._snackBar.open("Failed to Edit", "OK");
      console.log(error)

    })

  }
}
