import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplitService, Split } from '../services/split.service';
import { AlertController, RefresherCustomEvent, ToastController } from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  splits: Split[] = [];

  isLoading: boolean = true;
  isRefreshing: boolean = false;

  constructor(
    private router: Router,
    private splitService: SplitService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  loadSplits(): void {
    console.log("loadSpilt called");
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

  getActionSheetButtons(splitId: number | undefined) {
    return [
    {
      text: 'Edit Split',
      role: 'editSplit',
      icon: 'sync-outline',
      handler: () => {
        console.log('Replace clicked from exercise : ', splitId);
        this.handleEditClick(splitId);
      },
      data: { action: 'replace' }
    },
    {
      text: 'Delete Split',
      role: 'destructive',
      icon: 'trash-outline',
      data: { action: 'delete' }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ]}

  async presentDeleteAlert(event: CustomEvent<OverlayEventDetail>, splitId: number | undefined) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.handleDeleteClick(event, splitId);
          },
        },
      ],
    });
    await alert.present();
  }

  editActionHandler(event: CustomEvent<OverlayEventDetail>, splitId:number | undefined) {
    if(event.detail.role === 'destructive') {
      this.presentDeleteAlert(event, splitId);
    }
  }

  async handleDeleteClick(event: CustomEvent<OverlayEventDetail>, split_id: number|undefined) {
    console.log(`Dismissed with role: ${event.detail.role}, split_id: ${split_id}`);
    if(event.detail.role === 'destructive' && split_id !== undefined) {
      this.splitService.deleteSplit(split_id).subscribe({
        next: () => {
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: 'Split deleted successfully.',
              duration: 3000,
              color: 'success',
              position: 'bottom',
            });
            await toast.present();
          }, 1000);
          this.loadSplits();
        },
        error: (err: any) => {
          console.error('Error deleting split:', err);
        }
      });
    }
  }

  async handleEditClick(split_id: number|undefined) {
    console.log(`Edit split_id: ${split_id}`);
    this.router.navigate(['/create-split'], { queryParams: { split_id: split_id } });
  }

  handleStartWorkoutClick(split_id: number|undefined) {
    console.log(`Edit split_id: ${split_id}`);
    this.router.navigate(['/start-workout'], { queryParams: { split_id: split_id } });
  }

  doRefresh(event: RefresherCustomEvent) {
    this.isRefreshing = true;
    setTimeout(() => {
      window.location.reload();
      this.isRefreshing = false;
      event.target.complete(); 
    }, 1000);
  }

}