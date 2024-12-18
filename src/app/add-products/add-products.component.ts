import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { ImgBBService } from './imgbb.service';


@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [SidenavComponent, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatProgressBarModule,  HttpClientModule, MatProgressSpinnerModule],
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
   public imageUrl:string = ''
   private apiKey = 'd598ac4ed47d49cffbfb85a8fcd41b6b';
   private apiUrl = 'https://api.imgbb.com/1/upload';
  

   
   

 
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
    const formData = new FormData();
    
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
  uploadImage2(base64Image: string){
    const formData = new FormData();
    formData.append('image', base64Image.split(',')[1]); // Remove the prefix (e.g., "data:image/png;base64,")
    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, formData);
  }
  uploadImage(){
   this.productImage = this.base64;
   this.uploadImage2(this.productImage).subscribe((response:any) => {
    this.imageUrl = response.data.url; // The URL of the uploaded image
    console.log('Image URL:', this.imageUrl);
  });
  }

  view(){
    this.route.navigate(['/seller_dashboard/view_products'])
  }
  addProduct(){
    this.loading = true;
    if (this.imageUrl == "") {
      this.loading = true;
      
    }else{
      
      
      
      
      const productInfo = {
        productName:this.pName,
        price:this.price,
        salePrice:this.salePrice,
        discount:this.discount,
        quantity:this.quantity,
      description:this.description,
      productImage:this.imageUrl
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
}

