import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionFormComponent } from './reservacion-form.component';

describe('ReservacionFormComponent', () => {
  let component: ReservacionFormComponent;
  let fixture: ComponentFixture<ReservacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
