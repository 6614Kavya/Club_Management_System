import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFieldComponent } from './my-field.component';

describe('MyFieldComponent', () => {
  let component: MyFieldComponent;
  let fixture: ComponentFixture<MyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
