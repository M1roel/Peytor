import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUniversallyComponent } from './setting-universally.component';

describe('SettingUniversallyComponent', () => {
  let component: SettingUniversallyComponent;
  let fixture: ComponentFixture<SettingUniversallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingUniversallyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingUniversallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
