import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ExerciseService, Exercise } from '../services/exercise.service';
import { SplitService, Split } from '../services/split.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-split',
  templateUrl: './create-split.page.html',
  styleUrls: ['./create-split.page.scss'],
  standalone: false,
})
export class CreateSplitPage implements OnInit {
  HCExercises = [
    {
      exerciseId: '1',
      exerciseName: 'Barbell Back Squat',
      exerciseImage: 'barbell-squat.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      exerciseId: '2',
      exerciseName: 'Deadlift',
      exerciseImage: 'deadlift.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Other',
      primaryMuscle: 'Hamstrings',
    },
    {
      exerciseId: '3',
      exerciseName: 'Bench Press',
      exerciseImage: 'barbell-bench-press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      exerciseId: '4',
      exerciseName: 'Dumbbell Bench Press',
      exerciseImage: 'dumbbell_bench_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      exerciseId: '5',
      exerciseName: 'Incline Bench Press',
      exerciseImage: 'incline_bench_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      exerciseId: '6',
      exerciseName: 'Incline Dumbbell Bench Press',
      exerciseImage: 'incline_dumbbell_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      exerciseId: '7',
      exerciseName: 'Decline Bench Press',
      exerciseImage: 'decline_bench_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      exerciseId: '8',
      exerciseName: 'Decline Dumbbell Bench Press',
      exerciseImage: 'decline_dumbbell_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      exerciseId: '9',
      exerciseName: 'Pec Deck',
      exerciseImage: 'pec_dec.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      exerciseId: '10',
      exerciseName: 'Lower Chest Cable Press',
      exerciseImage: 'lower_chest_cable_press.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      exerciseId: '11',
      exerciseName: 'Dumbbell Overhead Shoulder Press',
      exerciseImage: 'dumbbell_shoulder_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
    },
    {
      exerciseId: '12',
      exerciseName: 'Arnold Press',
      exerciseImage: 'arnold_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
    },
    {
      exerciseId: '13',
      exerciseName: 'Dumbbell Shoulder Lateral Raise',
      exerciseImage: 'dumbbell_lateral_raise.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
    },
    {
      exerciseId: '14',
      exerciseName: 'Cable Shoulder Lateral Raise',
      exerciseImage: 'cable_lateral_raise.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
    },
    {
      exerciseId: '15',
      exerciseName: 'Barbell Curl',
      exerciseImage: 'barbell_curl.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      exerciseId: '16',
      exerciseName: 'Romanian Deadlift',
      exerciseImage: 'barbell_romanian_deadlift.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      exerciseId: '17',
      exerciseName: 'Incline Dumbbell Bench Press',
      exerciseImage: 'incline_dumbbell_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      exerciseId: '18',
      exerciseName: 'Leg Press',
      exerciseImage: 'machine_leg_press.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      exerciseId: '19',
      exerciseName: 'Plank',
      exerciseImage: 'plank.png',
      exerciseType: 'Bodyweight Timed',
      muscleGroup: 'Core',
      primaryMuscle: 'Abdominals (Rectus Abdominis)',
    },
    {
      exerciseId: '20',
      exerciseName: 'Pull Ups',
      exerciseImage: 'pullup.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Lats (Latissimus Dorsi)',
    },
    {
      exerciseId: '21',
      exerciseName: 'Push Ups',
      exerciseImage: 'pushup.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      exerciseId: '22',
      exerciseName: 'Seated Cable Row',
      exerciseImage: 'seated_cable_row.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      exerciseId: '23',
      exerciseName: 'Triceps Pushdown',
      exerciseImage: 'triceps_pushdown.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Triceps (Triceps Brachii)',
    },
    {
      exerciseId: '24',
      exerciseName: 'Bent Over Barbell Row',
      exerciseImage: 'bent-over-row.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      exerciseId: '25',
      exerciseName: 'Close Grip Lat Pulldown',
      exerciseImage: 'close-grip-lat-pulldown.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      exerciseId: '26',
      exerciseName: 'Lat Pulldown',
      exerciseImage: 'lat-pulldown.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Upper Back (Trapezius)',
    },
    {
      exerciseId: '27',
      exerciseName: 'Reverse Grip Lat Pulldown',
      exerciseImage: 'reverse-grip-lat-pulldown.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      exerciseId: '28',
      exerciseName: 'Straight Arm Pulldown',
      exerciseImage: 'straight-arm-pulldown.png',
      exerciseType: 'Bodyweight Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      exerciseId: '29',
      exerciseName: 'Single Arm Dumbbell Row',
      exerciseImage: 'single-arm-dumbbell-row.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      exerciseId: '30',
      exerciseName: 'Machine Rows',
      exerciseImage: 'machine-row.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      exerciseId: '31',
      exerciseName: 'Machine Reverse Fly',
      exerciseImage: 'machine-reverse-fly.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Rear Shoulders (Posterior Deltoid)',
    },
    {
      exerciseId: '32',
      exerciseName: 'Dumbbell Shrug',
      exerciseImage: 'dumbbell-shrug.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Upper Back (Trapezius)',
    },
    {
      exerciseId: '33',
      exerciseName: 'Prechure Curl',
      exerciseImage: 'prechure_curl.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      exerciseId: '34',
      exerciseName: 'Incline Dumbbell Curl',
      exerciseImage: 'incline_dumbbell_curl.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Long Head)',
    },
    {
      exerciseId: '35',
      exerciseName: 'Hammer Curl',
      exerciseImage: 'hammer_curl.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Brachialis)',
    },
    {
      exerciseId: '36',
      exerciseName: 'Dumbbell Curl',
      exerciseImage: 'dumbbell_curl.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      exerciseId: '37',
      exerciseName: 'Cable Curl',
      exerciseImage: 'cable_curl.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      exerciseId: '38',
      exerciseName: 'Dumbbell Lunges',
      exerciseImage: 'dumbbell-lunge.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      exerciseId: '39',
      exerciseName: 'Dumbbell Lunges',
      exerciseImage: 'dumbbell-lunge.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      exerciseId: '40',
      exerciseName: 'Dumbbell Romanian Deadlift',
      exerciseImage: 'dumbbell-romanian-deadlift.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      exerciseId: '41',
      exerciseName: 'Goblet Squat',
      exerciseImage: 'goblet-squat.png',
      exerciseType: 'Bodyweight Timed',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      exerciseId: '42',
      exerciseName: 'Leg Extension',
      exerciseImage: 'leg-extension.png',
      exerciseType: 'Isolation Weight',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      exerciseId: '43',
      exerciseName: 'Leg Curl',
      exerciseImage: 'seated-leg-curl.png',
      exerciseType: 'Isolation Weight',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      exerciseId: '44',
      exerciseName: 'Lying Leg Curl',
      exerciseImage: 'lying-leg-curl.png',
      exerciseType: 'Isolation Weight',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      exerciseId: '45',
      exerciseName: 'Machine Standing Calf Raise',
      exerciseImage: 'machine-standing-calf-raise.png',
      exerciseType: 'Isolation Weight',
      muscleGroup: 'Legs',
      primaryMuscle: 'Calves (Gastrocnemius)',
    },
    {
      exerciseId: '46',
      exerciseName: 'Seated Calf Raise',
      exerciseImage: 'seated-calf-raise.png',
      exerciseType: 'Isolation Weight',
      muscleGroup: 'Legs',
      primaryMuscle: 'Calves (Soleus)',
    },
    {
      exerciseId: '47',
      exerciseName: 'Smith Maching Squats',
      exerciseImage: 'smith-machine-squat.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      exerciseId: '48',
      exerciseName: 'Cable Overhead Tricep Extension',
      exerciseImage: 'cable-overhead-tricep-extension.png',
      exerciseType: 'Isolation Weight',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Long Head)',
    },
    {
      exerciseId: '49',
      exerciseName: 'Single Arm Dumbbell Tricep Extension',
      exerciseImage: 'single_arm_dumbbell_extension.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Long Head)',
    },
    {
      exerciseId: '50',
      exerciseName: 'Triceps Rope Pushdown',
      exerciseImage: 'tricep_rope_pushdown.png',
      exerciseType: 'Isolation Weight',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Lateral Head)',
    },
    {
      exerciseId: '51',
      exerciseName: 'Dumbbell Tricep Kickback',
      exerciseImage: 'dumbbell-tricep-kickback.png',
      exerciseType: 'Weighted Reps',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Lateral Head)',
    },
  ];

  splitName: string = '';
  searchQuery = '';
  selectedExerciseIds: Set<string> = new Set();
  defaultDay!: string;
  headerTitle: string = 'Create New Split';

  split: Split = {
    splitName: '',
    defaultDay: '',
    exerciseIds: [],
  };

  exercises: any[] = [];
  splitId!: number;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController,
    private exerciseService: ExerciseService,
    private splitService: SplitService
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
            this.splitName = data.splitName;
            this.selectedExerciseIds = new Set(data.exerciseIds);
            this.defaultDay = data.defaultDay;
            console.log('Loaded Split:', data);
          },
          error: (err) => {
            console.error('Error loading Split:', err);
          },
        });
      }
    });

    // fetching exercises from db/HCExercises
    // this.exerciseService.getExercises().subscribe({
    //   next: (data) => {
    //     this.exercises = data;
    //     console.log('Loaded exercises:', this.exercises);
    //   },
    //   error: (err) => {
    //     console.error('Error loading exercises:', err);
    //   }
    // });
    this.exercises = this.HCExercises;
  }

  get filteredExercises() {
    return this.exercises.filter((e) =>
      e.exerciseName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goBack() {
    this.navCtrl.back();
  }

  toggleExerciseSelection(id: string) {
    if (this.selectedExerciseIds.has(id)) {
      this.selectedExerciseIds.delete(id);
    } else {
      this.selectedExerciseIds.add(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedExerciseIds.has(id);
  }

  async saveSplit() {
    // const selected = this.exercises.filter(e => this.selectedExerciseIds.has(e.exercise_id));
    // const newSplit = {
    //   id: crypto.randomUUID(),
    //   name: this.splitName,
    //   exerciseIds: selected.map(e => e.exercise_id),
    // };
    // console.log(this.splitName ,selected);
    // this.splitService.createSplit(this.split).subscribe(res => {
    //   console.log('Split created:', res);
    // });
    // if(!this.splitName) {
    //   const toast = await this.toastController.create({
    //     message: 'Please enter a split name',
    //     duration: 3000,
    //     color: 'danger',
    //     position: 'bottom',
    //     swipeGesture: "vertical"
    //   });
    //   await toast.present();
    // } else if (this.selectedExerciseIds.size === 0) {
    //   const toast = await this.toastController.create({
    //     message: 'Select at least one exercise.',
    //     duration: 3000,
    //     color: 'danger',
    //     position: 'bottom',
    //     swipeGesture: "vertical"
    //   });
    //   await toast.present();
    // } else {
    //   const existingSplits = JSON.parse(localStorage.getItem('splits') || '[]');
    //   existingSplits.push(newSplit);
    //   localStorage.setItem('splits', JSON.stringify(existingSplits));
    //   console.log('Split saved:', newSplit);
    //   const toast = await this.toastController.create({
    //     message: 'Split Created Successfully.',
    //     duration: 3000,
    //     color: 'success',
    //     position: 'bottom',
    //     swipeGesture: "vertical"
    //   });
    //   await toast.present();
    //   this.navCtrl.back();
    // }

    if (!this.splitName) {
      const toast = await this.toastController.create({
        message: 'Please enter a split name',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
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
      });
      await toast.present();
      return;
    }

    const splitData: Split = {
      splitName: this.splitName,
      defaultDay: this.defaultDay,
      exerciseIds: Array.from(this.selectedExerciseIds),
    };
    console.log('split data', splitData);
    this.splitService.createSplit(splitData).subscribe({
      next: async (res) => {
        console.log('Split created:', res);
        const toast = await this.toastController.create({
          message: 'Split Created Successfully.',
          duration: 3000,
          color: 'success',
          position: 'bottom',
        });
        await toast.present();
        this.navCtrl.back();
      },
      error: async (err) => {
        console.error('Error creating split:', err);
        const toast = await this.toastController.create({
          message: 'Failed to create split.',
          duration: 3000,
          color: 'danger',
          position: 'bottom',
        });
        await toast.present();
      },
    });
  }
}
