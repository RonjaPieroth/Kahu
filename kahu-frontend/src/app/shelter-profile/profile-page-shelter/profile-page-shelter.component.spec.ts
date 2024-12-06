import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageShelterComponent } from './profile-page-shelter.component';

describe('ProfilePageShelterComponent', () => {
  let component: ProfilePageShelterComponent;
  let fixture: ComponentFixture<ProfilePageShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePageShelterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
