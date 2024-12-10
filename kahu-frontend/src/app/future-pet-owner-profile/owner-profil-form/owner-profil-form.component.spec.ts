import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProfilFormComponent } from './owner-profil-form.component';

describe('OwnerProfilFormComponent', () => {
  let component: OwnerProfilFormComponent;
  let fixture: ComponentFixture<OwnerProfilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerProfilFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerProfilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
