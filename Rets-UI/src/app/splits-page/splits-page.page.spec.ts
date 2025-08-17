import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitsPagePage } from './splits-page.page';

describe('SplitsPagePage', () => {
  let component: SplitsPagePage;
  let fixture: ComponentFixture<SplitsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
