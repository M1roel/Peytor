import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-customer-add',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent {
  customerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
}
