import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarticleComponent } from './editarticle.component';

describe('EditarticleComponent', () => {
  let component: EditarticleComponent;
  let fixture: ComponentFixture<EditarticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
