import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { dashboardGuardGuard } from './guards/dashboard-guard.guard';
import { ViewProductsComponent } from './view-products/view-products.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';

export const routes: Routes = [
    {path:'signup', component:SignUpComponent},
    {path:'signin', component:SignInComponent},
    {path:'stepperInfo', component:AdditionalInfoComponent},
    {path:'seller_dashboard', children:[
        {path:'', component:SellerDashboardComponent},
        {path:'add_products', component:AddProductsComponent},
        {path:'view_products', component:ViewProductsComponent},
    ], canActivate:[dashboardGuardGuard]},
];
