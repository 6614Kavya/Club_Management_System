import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamManagersComponent } from './manage-team-managers.component';

describe('ManageTeamManagersComponent', () => {
  let component: ManageTeamManagersComponent;
  let fixture: ComponentFixture<ManageTeamManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTeamManagersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTeamManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
