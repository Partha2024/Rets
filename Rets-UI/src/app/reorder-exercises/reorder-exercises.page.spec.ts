import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReorderExercisesPage } from './reorder-exercises.page';

describe('ReorderExercisesPage', () => {
  let component: ReorderExercisesPage;
  let fixture: ComponentFixture<ReorderExercisesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderExercisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
