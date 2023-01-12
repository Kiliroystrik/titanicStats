import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersGraphComponent } from './passengers-graph.component';

describe('PassengersGraphComponent', () => {
  let component: PassengersGraphComponent;
  let fixture: ComponentFixture<PassengersGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
