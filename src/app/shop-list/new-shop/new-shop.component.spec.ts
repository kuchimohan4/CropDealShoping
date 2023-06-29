import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShopComponent } from './new-shop.component';

describe('NewShopComponent', () => {
  let component: NewShopComponent;
  let fixture: ComponentFixture<NewShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewShopComponent]
    });
    fixture = TestBed.createComponent(NewShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
