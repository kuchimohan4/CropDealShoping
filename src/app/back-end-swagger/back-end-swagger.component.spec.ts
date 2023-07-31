import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndSwaggerComponent } from './back-end-swagger.component';

describe('BackEndSwaggerComponent', () => {
  let component: BackEndSwaggerComponent;
  let fixture: ComponentFixture<BackEndSwaggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackEndSwaggerComponent]
    });
    fixture = TestBed.createComponent(BackEndSwaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
