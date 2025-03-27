import { Component } from '@angular/core';
import { CustomerAccountComponent } from '../customer-account/customer-account.component';
import { CustomerPageComponent } from '../customer-page/customer-page.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-mobile-account',
  standalone: true,
  imports: [CustomerPageComponent, NavbarComponent],
  templateUrl: './mobile-account.component.html',
  styleUrl: './mobile-account.component.css'
})
export class MobileAccountComponent {

}
