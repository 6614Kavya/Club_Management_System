import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPartSelectionComponent } from './field-part-selection.component';

describe('FieldPartSelectionComponent', () => {
  let component: FieldPartSelectionComponent;
  let fixture: ComponentFixture<FieldPartSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldPartSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldPartSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
