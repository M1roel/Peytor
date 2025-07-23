import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms'; 

interface Address {
  street: string;
  house_number: string;
  zip_code: string;
  city: string;
  country: string;
}

interface Customer {
  customer_number: string;
  company_name: string;
  contact_person: string;
  vat_id: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  language: string;
  is_active: boolean;
  address: Address;
  notes: string;
}

@Component({
  selector: 'app-customer-add',
  imports: [RouterModule, FormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent {
  
  customer: Customer = {
    customer_number: '',
    company_name: '',
    contact_person: '',
    vat_id: '',
    email: '',
    phone: '',
    industry: '',
    website: '',
    language: '',
    is_active: true,
    address: {
      street: '',
      house_number: '',
      zip_code: '',
      city: '',
      country: ''
    },
    notes: ''
  };
}
