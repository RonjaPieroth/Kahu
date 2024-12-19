import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePagePetOwnerComponent } from './profile-page-pet-owner.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePagePetOwnerComponent;
  let fixture: ComponentFixture<ProfilePagePetOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePagePetOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePagePetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
