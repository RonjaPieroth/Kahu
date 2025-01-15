import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatElementComponent } from './chat-element.component';

describe('ChatElementComponent', () => {
  let component: ChatElementComponent;
  let fixture: ComponentFixture<ChatElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
