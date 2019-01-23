import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWebsiteComponent } from './setup-website.component';

describe('SetupWebsiteComponent', () => {
  let component: SetupWebsiteComponent;
  let fixture: ComponentFixture<SetupWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
