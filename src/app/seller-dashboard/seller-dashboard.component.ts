import { Component} from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [SidenavComponent, CommonModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  public ordersArray:(any)[]=[];

  constructor(private http:HttpClient){};
  ngOnInit(){
    this.http.get('http://localhost/projectEcommerce/seller_orders.php', {withCredentials:true}).subscribe((result:any)=>{
      this.ordersArray = result;
      console.log(this.ordersArray)
    }, (error:any)=>{
      console.log(error)
    })
  }
}

