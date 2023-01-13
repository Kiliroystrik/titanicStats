import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersSearchComponent } from './passengers-search.component';

describe('PassengersSearchComponent', () => {
  let component: PassengersSearchComponent;
  let fixture: ComponentFixture<PassengersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
