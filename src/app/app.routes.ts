import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component'; 
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component'; 
import { DashbordComponent } from './features/dashbord/dashbord.component';
import { HomeComponent } from './features/landing/home/home.component';
import { PricingComponent } from './features/landing/pricing/pricing.component';
import { AboutComponent } from './features/landing/about/about.component';
import { ContactComponent } from './features/landing/contact/contact.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';   
import { InvoicesComponent } from './features/invoices/invoices.component';
import { InvoiceListComponent } from './features/invoices/invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './features/invoices/invoice-edit/invoice-edit.component';
import { InvoiceDetailComponent } from './features/invoices/invoice-detail/invoice-detail.component'; 
import { SettingsComponent } from './features/settings/settings.component'; 

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashbordComponent },
      {
        path: 'customers',
        component: CustomersComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: CustomerListComponent },
          { path: 'detail/:id', component: CustomerDetailComponent }
        ]
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: InvoiceListComponent },
          { path: 'edit/:id', component: InvoiceEditComponent },
          { path: 'detail/:id', component: InvoiceDetailComponent }
        ]
      },      
      { path: 'settings', component: SettingsComponent },
    ]
  }
];
