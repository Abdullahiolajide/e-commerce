import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, CommonModule, RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public navbar:any = ''
  public body:any = ''
  public cartNum:number = 0;
  public productArray:any[]= []
  public productArray20:any[]= [];
  public cartArray:any[]= [];
  public thecartnum = 0

  // modal declarations
  public productName:string = '';
  public productImage:string = '';
  public salePrice:string = '';
  public price:string = '';
  public description:string = '';
  public productIndex:number = 0;

  constructor(private http:HttpClient, private route:Router){}



  ngOnInit(){
    this.http.get('http://localhost/projectEcommerce/all_products.php', {withCredentials:true}).subscribe((result:any)=>{
      this.productArray = result
      // console.log(this.productArray)/
      this.productArray20 = this.productArray.filter((item:any)=> item.discount >= 20).slice(0,3)
      this.productArray20.slice(0, 3)
    }, (error:any)=>{
      console.log(error)
    })
    this.cartArray = JSON.parse(localStorage.getItem('productCart') || '[]')
   

    console.log(this.cartNum)
    this.cartNum = this.cartArray.length

    
  }


  show(i:number){
    this.productImage = this.productArray[i].product_image
    this.productName = this.productArray[i].product_name
    this.salePrice = this.productArray[i].sale_price
    this.price = this.productArray[i].price
    this.description = this.productArray[i].description
    this.productIndex = i

  }


  addToCart(i:number){
    console.log(i)
    let cartItem = {
      productName: this.productArray[i].product_name,
      productImage: this.productArray[i].product_image,
      price: this.productArray[i].price,
      salePrice: this.productArray[i].sale_price,
      productId: this.productArray[i].product_id,
      sellerId: this.productArray[i].seller_id

    }
    this.cartArray.push(cartItem)
    localStorage.setItem('productCart', JSON.stringify(this.cartArray))
    this.cartNum = this.cartNum + 1
    console.log(this.productArray[i])
  }
  add(i:number){
    const cartArray = JSON.parse(localStorage.getItem('productCart') || '[]')
    let cartItem = {
      productName: this.productArray[i].product_name,
      productId: this.productArray[i].product_id,
      sellerId: this.productArray[i].seller_id

    }

    this.cartArray.push(cartItem)
    localStorage.setItem('productCart', JSON.stringify(this.cartArray))
    let cartProduct = cartArray.filter((item:any)=> item.productId == this.productArray[i].product_id)
    this.cartNum = this.cartNum + 1
    console.log(this.productArray)

    console.log(this.cartNum)
  }
  remove(i:number){
    const cartArray = JSON.parse(localStorage.getItem('productCart') || '[]')
    const toRemoveCartIndex = cartArray.findIndex((item:any)=> item.productId == this.productArray[i].product_id)
    console.log(toRemoveCartIndex)
    cartArray.splice(toRemoveCartIndex, 1)
    this.cartArray.splice(toRemoveCartIndex, 1)
    this.cartNum = this.cartNum - 1
    localStorage.setItem('productCart', JSON.stringify(cartArray)) 
    this.displayCartNumber(i)
  }
  cartValue(productId:number){
    const product = this.cartArray.find(item => item.productId === productId);
    if(product == undefined){
      return false
    }else{
      if (product.cart == 0) {
        return true;
      }else{
        return true
      }
    }
  }
  displayCartNumber(i:number){
    const cartDisplayNumber = this.cartArray.filter(cart=> cart.productId == this.productArray[i].product_id).length
    return cartDisplayNumber
    
  }
  cartRoute(){
    this.http.get('http://localhost/projectEcommerce/customer_auth.php', {withCredentials:true}).subscribe((result:any)=>{
      console.log(result)
      if (result.status) {
        this.route.navigate(['/checkout'])
      }
      else{
        this.route.navigate(['/customer_signin'])
      }
    })
    
  }
}