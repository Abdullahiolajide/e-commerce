import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';

import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatButtonModule, RouterLink, NavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  public cartArray:any[] = [];
  public dCartArray:any[] = [];
  public cartNumber:number = 1
  public sumP:number = 0
  public spinnervalue:boolean = false
  constructor(public http:HttpClient, public route: Router){}

  ngOnInit(){
    this.cartArray = JSON.parse(localStorage.getItem('productCart') || '[]');
    this.dCartArray = JSON.parse(localStorage.getItem('productCart') || '[]');

    for (let i = 0; i < this.dCartArray.length; i++) {
    // console.log(this.dCartArray[i].salePrice)  
    if (!this.dCartArray[i].salePrice) {
      this.dCartArray[i].salePrice = this.dCartArray.find(cart=> cart.productId == this.dCartArray[i].productId).salePrice
    }
    if (!this.dCartArray[i].productImage) {
      this.dCartArray[i].productImage = this.dCartArray.find(cart=> cart.productId == this.dCartArray[i].productId).productImage
    }
      
    }
    // console.log(this.dCartArray)

    for (let i = 0; i < this.dCartArray.length; i++) {
      this.sumP = this.sumP + parseInt(this.dCartArray[i].salePrice)
      
    }
    // console.log(this.sumP)
      
      const filtered = this.cartArray.filter((item, index, self) =>
        index === self.findIndex((p) => p.productId === item.productId)
      );
     
      this.cartArray = filtered
    }

    
    
    cartNum(i:number){
      const cartDisplayNumber = this.dCartArray.filter(cart=> cart.productId == this.cartArray[i].productId).length
      return cartDisplayNumber
    }
  

    addP(i:number){
      let newdc = this.dCartArray.filter(cart=> cart.productId == this.cartArray[i].productId)
      this.dCartArray.push({
        productId: newdc[newdc.length - 1].productId,
        productName: newdc[newdc.length - 1].productName,
        salePrice: newdc[newdc.length - 1].salePrice,
        sellerId: newdc[newdc.length - 1].sellerId,

      })
      console.log(this.dCartArray)
      localStorage.setItem('productCart', JSON.stringify(this.dCartArray))
      // this.ngOnInit()
     
      // this.sumP = this.sumP + parseInt(this.dCartArray[i].salePrice)
      this.totalsumP()
      // this.totalPrice(i)
      
      
      
    }
    deleteP(i:number){
      let newdc = this.dCartArray.filter(cart=> cart.productId == this.cartArray[i].productId)
      let newdci = this.dCartArray.findIndex(cart=> cart.productId == this.cartArray[i].productId)
     
        if (newdci != undefined) {
         this.dCartArray.splice(newdci, 1)
         console.log(newdc.length)
        
       }
      //  console.log(newdci)
        localStorage.setItem('productCart', JSON.stringify(this.dCartArray))
      if (newdc.length == 1) {
      //   this.ngOnInit()
      console.log(newdc.length)
        this.cartArray.splice(i,1)
      }
      // this.ngOnInit()
      this.totalsumP()
     
      
    }
    totalsumP(){
      // this.ngOnInit()
      this.sumP = 0
      for (let i = 0; i < this.dCartArray.length; i++) {
        this.sumP = this.sumP + parseInt(this.dCartArray[i].salePrice)
        
      }
    }

    deleteAp(i:number){
      let newdc = this.dCartArray.filter(cart=> cart.productId == this.cartArray[i].productId)
      let newdci = this.dCartArray.findIndex(cart=> cart.productId == this.cartArray[i].productId)
     
        for (let i = 0; i < newdc.length; i++) {
          if (newdci != undefined) {
            this.dCartArray.splice(newdci, 1)
            console.log(newdc.length)
           
          }
        }
        //  console.log(newdci)
        localStorage.setItem('productCart', JSON.stringify(this.dCartArray))
      // if (newdc.length == 1) {
      //   //   this.ngOnInit()
      //   this.cartArray.splice(i,1)
      // }
      // this.ngOnInit()
      this.ngOnInit()
      this.totalsumP()
     
    }
    cartRoute(){
      
          this.route.navigate(['/checkout'])
        
      
      
    }
    checkout(){

    if (this.sumP!=0) {

      this.http.get('http://localhost/projectEcommerce/customer_auth.php', {withCredentials:true}).subscribe((result:any)=>{
        console.log(result)
        if (result.status == true) {

          this.spinnervalue = true;
          console.log(`${this.sumP}00`)
          this.http.post('http://localhost/projectEcommerce/checkout.php', {cPrice: `${this.sumP}00`}, {withCredentials:true}).subscribe((result:any)=>{
            console.log(result)
          this.spinnervalue = false;
            console.log(result.data.authorization_url)
            window.location.href = result.data.authorization_url
          }, (error:any)=>{
          this.spinnervalue = false;
            console.log(error)
          })

        }
        else{
          this.route.navigate(['/customer_signin'])
        }
      }, (error:any)=>{
        console.log(error)
      })
    }else{
      alert("Add to Cart")
    }
     
    }
    
    clear(){
      localStorage.setItem('productCart', JSON.stringify([]))
      this.cartArray = JSON.parse(localStorage.getItem('productCart') || '[]')
      this.sumP = 0
    }
}
