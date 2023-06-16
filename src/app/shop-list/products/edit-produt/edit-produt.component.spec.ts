import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdutComponent } from './edit-produt.component';

describe('EditProdutComponent', () => {
  let component: EditProdutComponent;
  let fixture: ComponentFixture<EditProdutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProdutComponent]
    });
    fixture = TestBed.createComponent(EditProdutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
