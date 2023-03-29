import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCmsComponent } from './outlet-cms.component';

describe('OutletCmsComponent', () => {
  let component: OutletCmsComponent;
  let fixture: ComponentFixture<OutletCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
