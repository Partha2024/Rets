import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplitService, Split } from '../services/split.service';
import type { OverlayEventDetail } from '@ionic/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  splits: Split[] = [];

  isLoading: boolean = true;

  constructor(
    private router: Router,
    private splitService: SplitService,
    private popoverController: PopoverController
  ) {}

  loadSplits(): void {
    this.splitService.getSplits().subscribe({
      next: (data) => {
        this.splits = data;
        this.isLoading = false;
        console.log('Loaded Splits:', this.splits);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading exercises:', err);
      }
    });
  }

  ngOnInit(): void {
    this.loadSplits();
  }

  ionViewWillEnter() {
    const savedSplits = localStorage.getItem('splits');
    if (savedSplits) {
      this.splits = JSON.parse(savedSplits);
    }
  }
  
  onAddClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/create-split']);
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  async handleDeleteClick(event: CustomEvent<OverlayEventDetail>, split_id: number|undefined) {
    await this.popoverController.dismiss();
    console.log(`Dismissed with role: ${event.detail.role}, split_id: ${split_id}`);
    if(event.detail.role === 'confirm' && split_id !== undefined) {
      this.splitService.deleteSplit(split_id).subscribe({
        next: () => {
          console.log('Split deleted successfully');
          // this.splits = this.splits.filter(split => split.split_id !== split_id);
          // localStorage.setItem('splits', JSON.stringify(this.splits));
          this.loadSplits();
        },
        error: (err: any) => {
          console.error('Error deleting split:', err);
        }
      });
    }
  }

  async handleEditClick(split_id: number|undefined) {
    await this.popoverController.dismiss();
    console.log(`Edit split_id: ${split_id}`);
    // this.router.navigate(['/create-split?split_id=' + split_id]);
    this.router.navigate(['/create-split'], { queryParams: { split_id: split_id } });
  }

  handleStartWorkoutClick(split_id: number|undefined) {
    console.log(`Edit split_id: ${split_id}`);
    // this.router.navigate(['/create-split?split_id=' + split_id]);
    this.router.navigate(['/start-workout'], { queryParams: { split_id: split_id } });
  }

}
