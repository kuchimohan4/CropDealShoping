import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketFooterComponent } from './basket-footer.component';

describe('BasketFooterComponent', () => {
  let component: BasketFooterComponent;
  let fixture: ComponentFixture<BasketFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketFooterComponent]
    });
    fixture = TestBed.createComponent(BasketFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
