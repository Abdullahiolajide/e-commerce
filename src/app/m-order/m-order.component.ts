import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-m-order',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './m-order.component.html',
  styleUrl: './m-order.component.css'
})
export class MOrderComponent {

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
