import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatBadgeModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public cartArray:any[]= [];
  public cartNum:number = 0;
  public thecartnum = 0
  public tfx:any = ''
  public logged:boolean|null = null;
  constructor(private route:Router, private http:HttpClient){}

  
  ngOnInit(){
    this.cartArray = JSON.parse(localStorage.getItem('productCart') || '[]')
   
    
    console.log(this.cartNum)
    this.cartNum = this.cartArray.length
    this.tfx = document.querySelector('.tfx')

    this.http.get('http://localhost/projectEcommerce/customer_auth.php', {withCredentials:true}).subscribe((result:any)=>{
      console.log(result)
      if (result.status) {
        this.logged = true
      }
      else{
        this.logged = false

      }
    })
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log('You scrolled!');
    // console.log(this.tfx.classList)
    this.tfx.classList += " w-100 fixed tfixed"
      // const topValue = parseInt(getComputedStyle(this.tfx).top);

      // if (topValue === 0) {
      //     this.tfx.classList.add("mt-2");
      // } else {
      //     this.tfx.classList.remove("mt-2");
      //     this.tfx.classList.add("mt-0");
      // }
    
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

account(){
  this.http.get('http://localhost/projectEcommerce/customer_auth.php', {withCredentials:true}).subscribe((result:any)=>{
    console.log(result)
    const sWidth = window.innerWidth
    if (result.status) {
      if (sWidth <= 931) {
        
        this.route.navigate(['/maccount'])
      }
      else{
      this.route.navigate(['/account'])
      }
    }
    else{
      this.route.navigate(['/customer_signin'])
    }
  })

}
orders(){
  this.http.get('http://localhost/projectEcommerce/customer_auth.php', {withCredentials:true}).subscribe((result:any)=>{
    console.log(result)
    const sWidth = window.innerWidth

    if (result.status) {
      if (sWidth <= 931) {
        
        this.route.navigate(['/maccount'])
      }
      else{
      this.route.navigate(['/order-list'])
      }
    }
    else{
      this.route.navigate(['/customer_signin'])
    }
  })

}
logout(){
   this.http.get('http://localhost/projectEcommerce/customer_auth.php', {withCredentials:true}).subscribe((result:any)=>{
    console.log(result)
    if (result.status) {
      this.http.get('http://localhost/projectEcommerce/customer_logout.php', {withCredentials:true}).subscribe((result:any)=>{})
      this.route.navigate(['/'])
    }
    else{
      this.route.navigate(['/customer_signin'])
    }
  })
}

}
