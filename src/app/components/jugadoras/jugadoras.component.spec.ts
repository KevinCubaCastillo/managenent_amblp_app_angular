import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorasComponent } from './jugadoras.component';

describe('JugadorasComponent', () => {
  let component: JugadorasComponent;
  let fixture: ComponentFixture<JugadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
