import { Component } from '@angular/core';
import { CustomerPageComponent } from '../customer-page/customer-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CustomerPageComponent, NavbarComponent, CommonModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  constructor(private http:HttpClient){}
  public orderList:any[]=[];
  public orderArray:any[]=[];
  public backk:boolean = true;

  ngOnInit(){
    this.http.get('http://localhost/projectEcommerce/order_list.php', {withCredentials:true}).subscribe((result:any)=>{
      console.log(result)
      this.orderList = result;
    }, (error:any)=>{
      console.log(error)
    })
  }
  view(i:any){
    this.backk = false;
    console.log(this.orderList[i].created_at)
    this.http.post('http://localhost/projectEcommerce/order_items.php',{time: this.orderList[i].created_at}, {withCredentials:true}).subscribe((result:any)=>{
      console.log(result)
      this.orderArray = result
    }, (error:any)=>{
      console.log(error)
    })
  }
  back(){
    this.backk = true;
  }
}
