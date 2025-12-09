import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCustomerComponent } from './setting-customer.component';

describe('SettingCustomerComponent', () => {
  let component: SettingCustomerComponent;
  let fixture: ComponentFixture<SettingCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
