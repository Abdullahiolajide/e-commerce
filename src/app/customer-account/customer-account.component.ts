import { Component } from '@angular/core';
import { CustomerPageComponent } from '../customer-page/customer-page.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [CustomerPageComponent, NavbarComponent],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent {

}
