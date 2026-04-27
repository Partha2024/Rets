import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaterReminderPage } from './water-reminder.page';

describe('WaterReminderPage', () => {
  let component: WaterReminderPage;
  let fixture: ComponentFixture<WaterReminderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
