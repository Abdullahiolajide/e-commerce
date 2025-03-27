import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent {
public account:boolean = false;
public orderList:boolean = false;
constructor(private route:Router){}

ngOnInit(){
  console.log(window.location.pathname)
  if (window.location.pathname == '/account') {
    this.account = true
  }

  if (window.location.pathname == '/order-list') {
    this.orderList = true
  }
}
info(){
  if (window.innerWidth <= 931) {
    this.route.navigate(['/minfo'])
  }else{
    this.route.navigate(['/account'])

  }
}

order(){
  if (window.innerWidth <= 931) {
    this.route.navigate(['/morder'])
  }else{
    this.route.navigate(['/order-list'])

  }
}
}
