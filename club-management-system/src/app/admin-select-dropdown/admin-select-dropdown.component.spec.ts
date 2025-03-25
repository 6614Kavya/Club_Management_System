import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectDropdownComponent } from './admin-select-dropdown.component';

describe('AdminSelectDropdownComponent', () => {
  let component: AdminSelectDropdownComponent;
  let fixture: ComponentFixture<AdminSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSelectDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
