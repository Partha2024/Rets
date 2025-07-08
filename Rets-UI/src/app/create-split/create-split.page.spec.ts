import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSplitPage } from './create-split.page';

describe('CreateSplitPage', () => {
  let component: CreateSplitPage;
  let fixture: ComponentFixture<CreateSplitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSplitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
