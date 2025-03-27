import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  public status:boolean = false
  public count:number = 3
  public checks:any = ''
  constructor(private http:HttpClient, private route:Router){}
  public orders:(any)[] = [] 

  ngOnInit(){
    
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");
    this.checks = document.querySelector('#checkk')
    let obj = {
      reference
    }
    const storedOrders = JSON.parse(localStorage.getItem('productCart') || '[]');
    this.orders = storedOrders
    console.log(reference)
    this.http.post('http://localhost/projectEcommerce/verify_payment.php', obj , {withCredentials:true} ).subscribe((result:any)=>{
      console.log(result)
      if (result.status) {
        
        this.http.post('http://localhost/projectEcommerce/place_order.php', {storedOrders}, {withCredentials:true}).subscribe((result:any)=>{
          localStorage.setItem('productCart', JSON.stringify([]))
          console.log(result)
          this.status = result.status
          this.countDown()

    }, (error:any)=>{
      console.log(error)
    })
      }
     
      
    }, (error:any)=>{
      console.log(error)
    })

    // Couun down redirect 
  
  }

  countDown(){
  
    
    setInterval(()=>{
      
      if (this.count !=0) {
          this.count--
          console.log(this.count)
          }else{
            this.route.navigate(['/success'])
            return;
          }
        }, 1000)


    
  


  }
}
