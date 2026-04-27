import { Component } from '@angular/core';
import { WaterReminderService } from './services/water-reminder.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private waterReminderService: WaterReminderService) {}
}
