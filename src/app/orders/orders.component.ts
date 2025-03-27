import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  constructor(private http: HttpClient, private route:Router){}
  public ordersArray:any[] = [];
  public noi:number = 0;
  public tPrice:number = 0;

  ngOnInit(){
    // this.http.get('http://localhost/projectEcommerce/customer_auth.php', {withCredentials:true}).subscribe((result:any)=>{
    //   console.log(result)
    //   if (result.status) {
    //     this.route.navigate(['/checkout'])
    //   }
    //   else{
    //     // this.route.navigate(['/customer_signin'])
    //   }
    // })
    

    this.http.get('http://localhost/projectEcommerce/orders.php', {withCredentials:true}).subscribe((result:any)=>{
      console.log(result)
      this.ordersArray = result
      for (let i = 0; i < this.ordersArray.length; i++) {
       this.noi = this.noi + this.ordersArray[i].quantity
      }
      for (let i = 0; i < this.ordersArray.length; i++) {
        this.tPrice = this.tPrice + this.ordersArray[i].sale_price
       }
    })

  }
}
