import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTeamTabsComponent } from './field-team-tabs.component';

describe('FieldTeamTabsComponent', () => {
  let component: FieldTeamTabsComponent;
  let fixture: ComponentFixture<FieldTeamTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldTeamTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldTeamTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
