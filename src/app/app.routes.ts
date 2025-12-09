import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component';
import { CustomerAddComponent } from './features/customers/customer-add/customer-add.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/landing/home/home.component';
import { PricingComponent } from './features/landing/pricing/pricing.component';
import { AboutComponent } from './features/landing/about/about.component';
import { ContactComponent } from './features/landing/contact/contact.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { InvoicesComponent } from './features/invoices/invoices.component';
import { InvoiceNewComponent } from './features/invoices/invoice-new/invoice-new.component';
import { FormComponent } from './features/invoices/invoice-new/form/form.component';
import { WizardComponent } from './features/invoices/invoice-new/wizard/wizard.component';
import { CostsComponent } from './features/invoices/invoice-new/wizard/costs/costs.component';
import { CustomerComponent } from './features/invoices/invoice-new/wizard/customer/customer.component';
import { PositionsComponent } from './features/invoices/invoice-new/wizard/positions/positions.component';
import { PreviewComponent } from './features/invoices/invoice-new/wizard/preview/preview.component';
import { InvoiceListComponent } from './features/invoices/invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './features/invoices/invoice-edit/invoice-edit.component';
import { InvoiceDetailComponent } from './features/invoices/invoice-detail/invoice-detail.component';
import { SettingsComponent } from './features/settings/settings.component';
import { SettingInvoiceComponent } from './features/settings/setting-invoice/setting-invoice.component';
import { ImprintComponent } from './shared/imprint/imprint.component';
import { PolicyComponent } from './shared/policy/policy.component';

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
      { path: 'imprint', component: ImprintComponent },
      { path: 'policy', component: PolicyComponent },
    ],
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'customers',
        component: CustomersComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'add', component: CustomerAddComponent },
          { path: 'detail/:id', component: CustomerDetailComponent },
          { path: 'list', component: CustomerListComponent },
        ],
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: InvoiceListComponent },
          { path: 'edit/:id', component: InvoiceEditComponent },
          { path: 'detail/:id', component: InvoiceDetailComponent },
          {
            path: 'new',
            component: InvoiceNewComponent,
          },
          {
            path: 'wizard',
            component: WizardComponent,
            children: [
              { path: '', redirectTo: 'customer', pathMatch: 'full' },
              { path: 'customer', component: CustomerComponent },
              { path: 'costs', component: CostsComponent },
              { path: 'positions', component: PositionsComponent },
              { path: 'preview', component: PreviewComponent },
            ],
          },
          { path: 'form', component: FormComponent },
        ],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: 'invoice', component: SettingInvoiceComponent }
        ]
      },
    ],
  },
];
