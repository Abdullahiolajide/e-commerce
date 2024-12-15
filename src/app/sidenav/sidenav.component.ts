import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(public route:Router){}
  public backdrop:any = ''
  public sidebar:any = ''
  public listItems:any = ''
  ngOnInit(){
    this.backdrop = document.querySelector(".backdrop");
    this.sidebar = document.querySelector("#sidebar");

    
  }
  toggle(){
    this.ngOnInit()
      this.sidebar.classList.toggle("collapsed");
      this.backdrop.classList.toggle("collapsed");
      console.log('worked')
  }
  backdp(){
    this.sidebar.classList.toggle("collapsed");
    this.backdrop.classList.toggle("collapsed");
}
  logout(){
  localStorage.removeItem('token')
  this.route.navigate(['/signin'])
}
select(e:any){
  e.target.classList.toggle('bg')
}
}
