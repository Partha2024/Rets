import { Component, OnInit } from '@angular/core';
import { ItemReorderCustomEvent, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Split, SplitExercise, SplitService } from '../services/split.service';
import { NavController, ToastController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { exercises } from '../data/exercises.data';

@Component({
  selector: 'app-reorder-exercises',
  templateUrl: './reorder-exercises.page.html',
  styleUrls: ['./reorder-exercises.page.scss'],
  standalone: false,
})
export class ReorderExercisesPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private splitService: SplitService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  exercises = exercises;
  splitId!: number;
  splitName: string = '';
  defaultDay!: string;
  selectedExerciseIds: Set<SplitExercise> = new Set();
  exerciseArray: string[] = [];

  ngOnInit() {
    //fetching split id from query params
    this.route.queryParams.subscribe((params) => {
      this.splitId = params['split_id'];
      if (this.splitId) {
        console.log('Split ID from query param:', this.splitId);
        //fetching split data from db using split id
        this.splitService.getSplit(this.splitId).subscribe( {
          next: (data) => {
            this.splitName = data.splitName;
            this.defaultDay = data.defaultDay;
            this.selectedExerciseIds = new Set(data.exerciseIds);
            console.log('this.selectedExerciseIds : ', this.selectedExerciseIds);
            this.selectedExerciseIds.forEach((exercise) => {
              this.exerciseArray.push(exercise.exerciseId);
            })
            console.log('Loaded exerciseArray:', this.exerciseArray);
          },
          error: (err) => {
            console.error('Error loading Split:', err);
          },
          
        });
      } else {
        console.log("delay");
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  get selectedExercises() {
    return this.exercises.filter(ex =>
      Array.from(this.selectedExerciseIds).some(
        (e: any) => e.exerciseId === ex.exerciseId
      )
    ).sort((a, b) => {
      const orderA = (Array.from(this.selectedExerciseIds).find(
        (e: any) => e.exerciseId === a.exerciseId
      ) as any)?.sortOrder ?? 0;
      const orderB = (Array.from(this.selectedExerciseIds).find(
        (e: any) => e.exerciseId === b.exerciseId
      ) as any)?.sortOrder ?? 0;
      return orderA - orderB;
    });
  }

  
  handleReorderEnd(event: ItemReorderCustomEvent) {
    const itemMove = this.exerciseArray.splice(event.detail.from, 1)[0];
    this.exerciseArray.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
    // console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    // console.log('Order After Moving:', this.exerciseArray);
  }

  async saveOrder(){
    const loading = await this.loadingController.create({
      message: 'Updating Split',
      spinner: 'crescent'
    });
    await loading.present();

    const updatedExercises: SplitExercise[] = this.exerciseArray.map((exerciseId, index) => ({
      exerciseId: exerciseId,
      sortOrder: index + 1
    }));
    console.log('Save Clicked | Final Order : ', updatedExercises);

    const splitData: Split = {
      splitName: this.splitName,
      defaultDay: this.defaultDay,
      exerciseIds: Array.from(updatedExercises),
    };
    console.log('Payload : ', splitData);
    this.splitService.updateSplit(this.splitId, splitData).subscribe({
      next: async (res) => {
        console.log('Split Updated:', res);
        const toast = await this.toastController.create({
          message: 'Split Updated Successfully.',
          duration: 3000,
          color: 'success',
          position: 'bottom',
          swipeGesture: 'vertical'
        });
        await toast.present();
        this.navCtrl.back();
        setTimeout(() => {
          window.location.reload();
        },200)
      },
      error: async (err) => {
        console.error('Error Updating split:', err);
        const toast = await this.toastController.create({
          message: 'Failed to Update split.',
          duration: 3000,
          color: 'danger',
          position: 'bottom',
          swipeGesture: 'vertical'
        });
        await toast.present();
      },
      complete: async () => {
        await loading.dismiss();
      }
    });
  }
}
