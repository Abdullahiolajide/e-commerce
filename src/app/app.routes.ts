import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { dashboardGuardGuard } from './guards/dashboard-guard.guard';
import { ViewProductsComponent } from './view-products/view-products.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CustomerSignUpComponent } from './customer-sign-up/customer-sign-up.component';
import { CustomerSignInComponent } from './customer-sign-in/customer-sign-in.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CollectionComponent } from './collection/collection.component';
import { VerifyComponent } from './verify/verify.component';
import { SuccessComponent } from './success/success.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { MobileAccountComponent } from './mobile-account/mobile-account.component';
import { MInfoComponent } from './m-info/m-info.component';
import { MOrderComponent } from './m-order/m-order.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'signup', component:SignUpComponent},
    {path:'signin', component:SignInComponent},
    {path:'customer_signup', component:CustomerSignUpComponent},
    {path:'customer_signin', component:CustomerSignInComponent},
    {path:'checkout', component:CheckoutComponent},
    {path:'collections', component:CollectionComponent},
    {path:'verify', component:VerifyComponent},
    {path:'success', component:SuccessComponent},
    {path:'account', component:CustomerAccountComponent},
    {path:'nav', component:NavbarComponent},
    {path:'orders', component:OrdersComponent},
    {path:'order-list', component:OrdersListComponent},
    {path:'maccount', component:MobileAccountComponent},
    {path:'minfo', component:MInfoComponent},
    {path:'morder', component:MOrderComponent},
    {path:'cp', component:CustomerPageComponent},
    {path:'seller_dashboard', children:[
        {path:'', component:SellerDashboardComponent},
        {path:'stepperInfo', component:AdditionalInfoComponent},
        {path:'add_products', component:AddProductsComponent},
        {path:'view_products', component:ViewProductsComponent},
        {path:'profile', component:ProfileComponent},
    ], canActivate:[dashboardGuardGuard]},
];
