import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposDamasComponent } from './equipos-damas.component';

describe('EquiposDamasComponent', () => {
  let component: EquiposDamasComponent;
  let fixture: ComponentFixture<EquiposDamasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposDamasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposDamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
