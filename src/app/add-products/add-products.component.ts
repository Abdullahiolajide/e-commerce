import { Component, viewChild } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Route, Router } from '@angular/router';
// import { v2 as cloudinary } from 'cloudinary';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [SidenavComponent, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatProgressBarModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
  constructor(private _snackBar: MatSnackBar, private http:HttpClient, public route:Router) {}
   public pName:string = '';
   public price ='';
   public salePrice:number|null =null;
   public discount:number = 0;
   public quantity ='';
   public description:string = '';
   public base64:string = ''
   public productImage =''
   public loading:boolean = false;
   

 
  openSnackBar(message:any, action:any) {
    this._snackBar.open(message, action, {
      duration: 4500
    });
  }

  calculateDiscount(){
    this.salePrice = Math.floor(parseInt(this.price) - (this.discount/100) * parseInt(this.price))
  }

  convertToBase64(event: Event): void {
    this.loading = true
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string; 
        this.base64 = base64String
        this.loading = false
      };
      
      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };
      
      reader.readAsDataURL(file);
    }
    this.loading = false
  }
  uploadImage(){
    this.productImage = this.base64;
  }
  view(){
    this.route.navigate(['/seller_dashboard/view_products'])
  }
  addProduct(){
  //   cloudinary.config({ 
  //     cloud_name: 'dsr9rtryb', 
  //     api_key: '645324881817375', 
  //     api_secret: 'XH3EpFwcQMK15sCRBrEDdPrZMEQ' // Click 'View API Keys' above to copy your API secret
  // });

// NG02801: Angular detected that `HttpClient` is not configured to use `fetch` APIs. It's strongly recommended to enable `fetch` for applications that use Server-Side Rendering for better performance and compatibility. To enable `fetch`, add the `withFetch()` to the `provideHttpClient()` call at the root of the application.

  // let media = this.productImage;
  //   cloudinary.uploader.upload(media, (err, result)=>{
  //       if(result){
  //         console.log(result.secure_url) 

  //       }else{
  //           console.log(err)
  //       }
  //   })
    this.loading = true;
    const productInfo = {
      productName:this.pName,
      price:this.price,
      salePrice:this.salePrice,
      discount:this.discount,
      quantity:this.quantity,
      description:this.description,
      productImage:this.productImage
    }
    console.log(productInfo)
this.http.post('http://localhost/projectEcommerce/add_product.php', productInfo,  { withCredentials: true }).subscribe((response:any)=>{
  console.log(response)
  this.openSnackBar(response.message, 'view')
  this.loading = false

},
(error:any)=>{
  console.log(error)
  this.openSnackBar("Poor network!!", "OK")
  this.loading = false

}
)

  }
}

