import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListComponent } from './invoice-list.component';

fdescribe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;
  let routerMock: any;
  let invoicesServiceMock: any;
  let errorMessagesServiceMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jasmine.createSpy('navigate') };
    invoicesServiceMock = {
      getInvoices: jasmine.createSpy('getInvoices').and.returnValue(Promise.resolve([])),
      cancelInvoice: jasmine.createSpy('cancelInvoice').and.returnValue(Promise.resolve(null))
    };
    errorMessagesServiceMock = {
      getInvoiceErrorMessage: jasmine.createSpy('getInvoiceErrorMessage').and.returnValue('Fehler!')
    };

    await TestBed.configureTestingModule({
      imports: [InvoiceListComponent],
      providers: [
        { provide: 'Router', useValue: routerMock },
        { provide: 'InvoicesService', useValue: invoicesServiceMock },
        { provide: 'ErrorMessagesService', useValue: errorMessagesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    (component as any).router = routerMock;
    (component as any).invoicesService = invoicesServiceMock;
    (component as any).errorMessagesService = errorMessagesServiceMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display invoices', () => {
    const mockInvoices = [
      { id: 1, customer: 'Kunde A', status: 'Entwurf', amount: 100, date: '2025-12-01', items: [], user_id: 1, number: 'INV-001', reverseCharge: false },
      { id: 2, customer: 'Kunde B', status: 'Offen', amount: 200, date: '2025-12-02', items: [], user_id: 1, number: 'INV-002', reverseCharge: false }
    ];
    component.invoices = mockInvoices as any;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Kunde A');
    expect(compiled.textContent).toContain('Kunde B');
  });

  it('should toggle showSuccess when cancel is called with Entwurf', async () => {
    spyOn(component, 'getInvoices').and.returnValue(Promise.resolve());
    component.showSuccess = false;
    await component.cancel('Entwurf', 1);
    expect(component.showSuccess).toBeTrue();
  });

  it('should call view() and navigate to detail', () => {
    component.view(42);
    expect(routerMock.navigate).toHaveBeenCalledWith(['app/invoices/detail', 42]);
  });

  it('should call create() and navigate to new', () => {
    component.create();
    expect(routerMock.navigate).toHaveBeenCalledWith(['app/invoices/new']);
  });
});
