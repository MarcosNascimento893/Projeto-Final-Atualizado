import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroselHomeComponent } from './carrosel-home.component';

describe('CarroselHomeComponent', () => {
  let component: CarroselHomeComponent;
  let fixture: ComponentFixture<CarroselHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarroselHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroselHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
