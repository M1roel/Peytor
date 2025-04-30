import { Routes } from '@angular/router';
import { DashbordComponent } from './features/dashbord/dashbord.component';
import { HomeComponent } from './features/landing/home/home.component';
import { PricingComponent } from './features/landing/pricing/pricing.component';
import { AboutComponent } from './features/landing/about/about.component';
import { ContactComponent } from './features/landing/contact/contact.component';
import { RegisterComponent } from './features/auth/register/register.component';  

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent}   
];
