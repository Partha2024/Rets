import { Component, OnInit } from '@angular/core';
import { ItemReorderCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  standalone: false
})

export class ProfilePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  handleReorderEnd(event: ItemReorderCustomEvent) {
    const itemMove = this.items.splice(event.detail.from, 1)[0];
    this.items.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }

}
