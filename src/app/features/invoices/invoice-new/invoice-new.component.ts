import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-new',
  imports: [RouterModule],
  templateUrl: './invoice-new.component.html',
  styleUrl: './invoice-new.component.scss'
})
export class InvoiceNewComponent {

  constructor(private router: Router) {}

}
