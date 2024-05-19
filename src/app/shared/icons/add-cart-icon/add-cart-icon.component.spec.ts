import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartIconComponent } from './add-cart-icon.component';

describe('AddCartIconComponent', () => {
  let component: AddCartIconComponent;
  let fixture: ComponentFixture<AddCartIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCartIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
