import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ExerciseService, Exercise as ServiceExercise } from '../services/exercise.service'; // Renamed to avoid collision if necessary, checking if used.
import { SplitService, Split, SplitExercise } from '../services/split.service';
import { ActivatedRoute } from '@angular/router';
import { exercises } from '../data/exercises.data';
// import { ReorderEndCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-create-split',
  templateUrl: './create-split.page.html',
  styleUrls: ['./create-split.page.scss'],
  standalone: false,
})
export class CreateSplitPage implements OnInit {
  
  splitName: string = '';
  searchQuery = '';
  selectedExerciseIds: Set<SplitExercise> = new Set();
  defaultDay!: string;
  headerTitle: string = 'Create New Split';
  selectionTimestamps: Map<string, number> = new Map();

  split: Split = {
    splitName: '',
    defaultDay: '',
    exerciseIds: [],
  };

  exercises = exercises;
  splitId!: number;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController,
    private exerciseService: ExerciseService,
    private splitService: SplitService,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    //fetching split id from query params
    this.route.queryParams.subscribe((params) => {
      this.splitId = params['split_id'];
      if (this.splitId) {
        console.log('Split ID from query param:', this.splitId);
        this.headerTitle = 'Edit Split';
        //fetching split data from db
        this.splitService.getSplit(this.splitId).subscribe({
          next: (data) => {
            console.log('Split Data:', data);
            this.splitName = data.splitName;
            this.selectedExerciseIds = new Set(data.exerciseIds);
            console.log('Selected Exercise IDs:', this.selectedExerciseIds);
            this.defaultDay = data.defaultDay;
            console.log('Loaded Existing Split:', data);
            data.exerciseIds.forEach((exercise) => {
              this.selectionTimestamps.set(exercise.exerciseId, Date.now());
            })
          },
          error: (err) => {
            console.error('Error loading Split:', err);
          },
        });
      }
    });
    // this.exercises = this.HCExercises;
  }

  
  goBack() {
    this.navCtrl.back();
  }
  
  // toggleExerciseSelection(id: string) {
  //   if (this.selectedExerciseIds.has(id)) {
  //     this.selectedExerciseIds.delete(id);
  //     this.selectionTimestamps.delete(id);
  //   } else {
  //     this.selectedExerciseIds.add(id);
  //     this.selectionTimestamps.set(id, Date.now());
  //   }
  // }

  toggleExerciseSelection(id: string) {
    const existing = Array.from(this.selectedExerciseIds).find(
      (e: any) => e.exerciseId === id
    );
    if (existing) {
      this.selectedExerciseIds.delete(existing);
      this.selectionTimestamps.delete(id);
    } else {
      this.selectedExerciseIds.add({ exerciseId: id, sortOrder: this.selectedExerciseIds.size + 1 });
      this.selectionTimestamps.set(id, Date.now());
    }
    console.log('Selected Exercises:', Array.from(this.selectedExerciseIds));
  }

  isSelected(id: string): boolean {
    // return this.selectedExerciseIds.has(id);
    return Array.from(this.selectedExerciseIds).some(
      (e: SplitExercise) => e.exerciseId === id
    );
  }

  get filteredExercises() {
    return this.exercises.filter(e => e.exerciseName.toLowerCase().includes(this.searchQuery.toLowerCase())).sort((a, b) => {
      const aTime = this.selectionTimestamps.get(a.exerciseId);
      const bTime = this.selectionTimestamps.get(b.exerciseId);
      if (aTime && bTime) {
        return aTime-bTime;
      } else if (aTime) {
        return -1;
      } else if (bTime) {
        return 1;
      } else {
        return 0;
      }
    });
  }   

  async saveSplit() {

    // validation checks
    if (!this.splitName) {
      const toast = await this.toastController.create({
        message: 'Please enter a split name',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
        swipeGesture: 'vertical'
      });
      await toast.present();
      return;
    }

    if (!this.defaultDay) {
      const toast = await this.toastController.create({
        message: 'Please select a default day',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
        swipeGesture: 'vertical'
      });
      await toast.present();
      return;
    }

    if (this.selectedExerciseIds.size === 0) {
      const toast = await this.toastController.create({
        message: 'Select at least one exercise.',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
        swipeGesture: 'vertical'
      });
      await toast.present();
      return;
    }

    //payload
    const splitData: Split = {
      splitName: this.splitName,
      defaultDay: this.defaultDay,
      exerciseIds: Array.from(this.selectedExerciseIds),
    };

    console.log("Split Payload: ", splitData)

    // subscription to create or update split
    if(this.splitId){
        const loading = await this.loadingController.create({
          message: 'Updating Split',
          spinner: 'crescent'
        });
        await loading.present();
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
    }else{
      const loading = await this.loadingController.create({
        message: 'Creating Split',
        spinner: 'crescent'
      });
      await loading.present();
      this.splitService.createSplit(splitData).subscribe({
        next: async (res) => {
          console.log('Split created:', res);
          const toast = await this.toastController.create({
            message: 'Split Created Successfully.',
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
          console.error('Error creating split:', err);
          const toast = await this.toastController.create({
            message: 'Failed to create split.',
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
}
