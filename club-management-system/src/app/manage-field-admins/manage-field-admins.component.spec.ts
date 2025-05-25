import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFieldAdminsComponent } from './manage-field-admins.component';

describe('ManageFieldAdminsComponent', () => {
  let component: ManageFieldAdminsComponent;
  let fixture: ComponentFixture<ManageFieldAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFieldAdminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFieldAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
