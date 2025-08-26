import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTimingService, ApiTiming } from '../services/timing.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})

export class ProfilePagePage implements OnInit {
  timings$!: Observable<ApiTiming[]>;

  constructor(private timingService: ApiTimingService) {}

  ngOnInit() {
    this.timings$ = this.timingService.timings$;
  }

}
