import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletFrontComponent } from './outlet-front.component';

describe('OutletFrontComponent', () => {
  let component: OutletFrontComponent;
  let fixture: ComponentFixture<OutletFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
