import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [SidenavComponent, CommonModule, FormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {
  constructor(private http:HttpClient, private _snackBar: MatSnackBar){}
  public filterInput:string = ''
  public products:any[]=[];
  public displayProducts:any[]=[];
  public productImg:string = ''
  public productName:string = ''
  public price:number = 0;
  public salePrice:number = 0
  public quantity:number = 0;
  public discount:number = 0;
  public description:string = '';

  ngOnInit(){
    this.http.get('http://localhost/projectEcommerce/get_products.php', { withCredentials: true }).subscribe((data:any)=>{
      this.products = data
      this.displayProducts = data
    }, (error:any)=>{
      console.log("Error Occured"+error)
    })
  }
  openSnackBar(message:any, action:any) {
    this._snackBar.open(message, action, {
      duration: 3500
    });
  }

  filter(){
      let find = this.filterInput.toLowerCase()
      let products = this.products
      const dp = products.filter((dp:any)=> dp.product_name.toLowerCase().indexOf(find) != -1)
      this.displayProducts = dp
      
  }
  show(i:number){
    this.productImg = this.displayProducts[i].product_image
    this.productName =  this.displayProducts[i].product_name
    this.price =  this.displayProducts[i].price
    this.salePrice =  this.displayProducts[i].quantity
    this.discount =  this.displayProducts[i].discount
    this.description =  this.displayProducts[i].description
  }
  del(i:any){
    console.log(this.displayProducts[i])
    const productId = {
      productId:this.displayProducts[i].product_id
    }
    this.http.post('http://localhost/projectEcommerce/delete_product.php', productId, {withCredentials: true}).subscribe((data:any)=>{
      console.log(data)
      this.ngOnInit()
      this.openSnackBar('product deleted successfully', 'OK')
    }, (error:any)=>{
      console.log(error)
    })
  }
}
