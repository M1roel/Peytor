import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../core/services/customer.service';

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
  vat_language: string;
  vat_id: number;
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
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      customer_number: [''],
      company_name: ['', Validators.required],
      contact_person: [''],
      vat_language: ['', Validators.required],
      vat_id: ['', [Validators.required, Validators.pattern('[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      industry: [''],
      website: [''],
      language: ['de'],
      is_active: [true],
      address: this.fb.group({
        street: ['', Validators.required],
        house_number: ['', Validators.required],
        zip_code: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      notes: ['']
    });
  }

  async onSubmit() {
      const customer = this.customerForm.value;
      try {
        await this.customerService.storeCustomerData(customer);
      } catch (error) {
        console.error('Error storing customer data:', error);
      }
  }
}

