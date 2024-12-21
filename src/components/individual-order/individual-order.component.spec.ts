import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualOrderComponent } from './individual-order.component';

describe('IndividualOrderComponent', () => {
  let component: IndividualOrderComponent;
  let fixture: ComponentFixture<IndividualOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
