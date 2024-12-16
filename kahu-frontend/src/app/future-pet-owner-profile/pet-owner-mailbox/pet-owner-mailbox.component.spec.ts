import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetOwnerMailboxComponent } from './pet-owner-mailbox.component';

describe('PetOwnerMailboxComponent', () => {
  let component: PetOwnerMailboxComponent;
  let fixture: ComponentFixture<PetOwnerMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetOwnerMailboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetOwnerMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
