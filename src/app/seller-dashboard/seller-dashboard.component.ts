import { Component} from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";


@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  
}

