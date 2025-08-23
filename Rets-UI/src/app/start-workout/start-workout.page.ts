// import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
// import { NavController, ToastController, RefresherCustomEvent } from '@ionic/angular';
// import { ActivatedRoute } from '@angular/router';
// import { SplitExercise, SplitService } from '../services/split.service';
// import {
//   WorkoutService,
//   lastWorkoutSession,
// } from '../services/workoutSession.service';
// import type { OverlayEventDetail } from '@ionic/core';
// import { IonModal, ModalController } from '@ionic/angular';
// import { ReplaceExerciseModal } from './components/replace-exercise.component';

// interface Exercise {
//   Exercise_id: string;
//   Exercise_name: string;
//   Exercise_image: string;
//   Exercise_type: string;
//   muscleGroup: string;
//   primaryMuscle: string;
// }

// type ExerciseWithOrder = Exercise & { sortOrder: number };

// @Component({
//   selector: 'app-start-workout',
//   templateUrl: './start-workout.page.html',
//   styleUrls: ['./start-workout.page.scss'],
//   standalone: false,
// })

// export class StartWorkoutPage implements OnInit {
//   @ViewChild(IonModal) modal!: IonModal;

//   setInputs: {
//     [exerciseId: string]: {
//       weight?: number;
//       reps?: number;
//       time?: string;
//     }[];
//   } = {};

//   lastSessionData: {
//     [exerciseId: string]: {
//       weight?: number;
//       reps?: number;
//       time?: string;
//     }[];
//   } = {};

//   exercises = [
//     {
//       Exercise_id: '1',
//       Exercise_name: 'Barbell Back Squat',
//       Exercise_image: 'barbell-squat.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Quads (Quadriceps)',
//     },
//     {
//       Exercise_id: '2',
//       Exercise_name: 'Deadlift',
//       Exercise_image: 'deadlift.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Other',
//       primaryMuscle: 'Hamstrings',
//     },
//     {
//       Exercise_id: '3',
//       Exercise_name: 'Bench Press',
//       Exercise_image: 'barbell-bench-press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Mid Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '4',
//       Exercise_name: 'Dumbbell Bench Press',
//       Exercise_image: 'dumbbell_bench_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Mid Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '5',
//       Exercise_name: 'Incline Bench Press',
//       Exercise_image: 'incline_bench_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Upper Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '6',
//       Exercise_name: 'Incline Dumbbell Bench Press',
//       Exercise_image: 'incline_dumbbell_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Upper Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '7',
//       Exercise_name: 'Decline Bench Press',
//       Exercise_image: 'decline_bench_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Lower Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '8',
//       Exercise_name: 'Decline Dumbbell Bench Press',
//       Exercise_image: 'decline_dumbbell_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Lower Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '9',
//       Exercise_name: 'Pec Deck',
//       Exercise_image: 'pec_dec.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Mid Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '10',
//       Exercise_name: 'Lower Chest Cable Press',
//       Exercise_image: 'lower_chest_cable_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Lower Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '11',
//       Exercise_name: 'Dumbbell Overhead Shoulder Press',
//       Exercise_image: 'dumbbell_shoulder_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Shoulders',
//       primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
//     },
//     {
//       Exercise_id: '12',
//       Exercise_name: 'Arnold Press',
//       Exercise_image: 'arnold_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Shoulders',
//       primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
//     },
//     {
//       Exercise_id: '13',
//       Exercise_name: 'Dumbbell Shoulder Lateral Raise',
//       Exercise_image: 'dumbbell_lateral_raise.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Shoulders',
//       primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
//     },
//     {
//       Exercise_id: '14',
//       Exercise_name: 'Cable Shoulder Lateral Raise',
//       Exercise_image: 'cable_lateral_raise.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Shoulders',
//       primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
//     },
//     {
//       Exercise_id: '15',
//       Exercise_name: 'Barbell Curl',
//       Exercise_image: 'barbell_curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Arms',
//       primaryMuscle: 'Biceps (Short Head)',
//     },
//     {
//       Exercise_id: '16',
//       Exercise_name: 'Romanian Deadlift',
//       Exercise_image: 'barbell_romanian_deadlift.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Hamstrings',
//     },
//     {
//       Exercise_id: '17',
//       Exercise_name: 'Incline Dumbbell Bench Press',
//       Exercise_image: 'incline_dumbbell_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Upper Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '18',
//       Exercise_name: 'Leg Press',
//       Exercise_image: 'machine_leg_press.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Quads (Quadriceps)',
//     },
//     {
//       Exercise_id: '19',
//       Exercise_name: 'Plank',
//       Exercise_image: 'plank.png',
//       Exercise_type: 'Bodyweight Timed',
//       muscleGroup: 'Core',
//       primaryMuscle: 'Abdominals (Rectus Abdominis)',
//     },
//     {
//       Exercise_id: '20',
//       Exercise_name: 'Pull Ups',
//       Exercise_image: 'pullup.png',
//       Exercise_type: 'Bodyweight Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Lats (Latissimus Dorsi)',
//     },
//     {
//       Exercise_id: '21',
//       Exercise_name: 'Push Ups',
//       Exercise_image: 'pushup.png',
//       Exercise_type: 'Bodyweight Reps',
//       muscleGroup: 'Chest',
//       primaryMuscle: 'Mid Chest (Pectoralis Major)',
//     },
//     {
//       Exercise_id: '22',
//       Exercise_name: 'Seated Cable Row',
//       Exercise_image: 'seated_cable_row.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Middle Back (Rhomboids)',
//     },
//     {
//       Exercise_id: '23',
//       Exercise_name: 'Triceps Pushdown',
//       Exercise_image: 'triceps_pushdown.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Arms',
//       primaryMuscle: 'Triceps (Triceps Brachii)',
//     },
//     {
//       Exercise_id: '24',
//       Exercise_name: 'Bent Over Barbell Row',
//       Exercise_image: 'bent-over-row.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Middle Back (Rhomboids)',
//     },
//     {
//       Exercise_id: '25',
//       Exercise_name: 'Close Grip Lat Pulldown',
//       Exercise_image: 'close-grip-lat-pulldown.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Middle Back (Rhomboids)',
//     },
//     {
//       Exercise_id: '26',
//       Exercise_name: 'Lat Pulldown',
//       Exercise_image: 'lat-pulldown.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Upper Back (Trapezius)',
//     },
//     {
//       Exercise_id: '27',
//       Exercise_name: 'Reverse Grip Lat Pulldown',
//       Exercise_image: 'reverse-grip-lat-pulldown.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Middle Back (Rhomboids)',
//     },
//     {
//       Exercise_id: '28',
//       Exercise_name: 'Straight Arm Pulldown',
//       Exercise_image: 'straight-arm-pulldown.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Middle Back (Rhomboids)',
//     },
//     {
//       Exercise_id: '29',
//       Exercise_name: 'Single Arm Dumbbell Row',
//       Exercise_image: 'single-arm-dumbbell-row.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Middle Back (Rhomboids)',
//     },
//     {
//       Exercise_id: '30',
//       Exercise_name: 'Machine Rows',
//       Exercise_image: 'machine-row.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Middle Back (Rhomboids)',
//     },
//     {
//       Exercise_id: '31',
//       Exercise_name: 'Machine Reverse Fly',
//       Exercise_image: 'machine-reverse-fly.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Rear Shoulders (Posterior Deltoid)',
//     },
//     {
//       Exercise_id: '32',
//       Exercise_name: 'Dumbbell Shrug',
//       Exercise_image: 'dumbbell-shrug.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Back',
//       primaryMuscle: 'Upper Back (Trapezius)',
//     },
//     {
//       Exercise_id: '33',
//       Exercise_name: 'Prechure Curl',
//       Exercise_image: 'prechure_curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Arms',
//       primaryMuscle: 'Biceps (Short Head)',
//     },
//     {
//       Exercise_id: '34',
//       Exercise_name: 'Incline Dumbbell Curl',
//       Exercise_image: 'incline_dumbbell_curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Arms',
//       primaryMuscle: 'Biceps (Long Head)',
//     },
//     {
//       Exercise_id: '35',
//       Exercise_name: 'Hammer Curl',
//       Exercise_image: 'hammer_curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Arms',
//       primaryMuscle: 'Biceps (Brachialis)',
//     },
//     {
//       Exercise_id: '36',
//       Exercise_name: 'Dumbbell Curl',
//       Exercise_image: 'dumbbell_curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Arms',
//       primaryMuscle: 'Biceps (Short Head)',
//     },
//     {
//       Exercise_id: '37',
//       Exercise_name: 'Cable Curl',
//       Exercise_image: 'cable_curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Arms',
//       primaryMuscle: 'Biceps (Short Head)',
//     },
//     {
//       Exercise_id: '38',
//       Exercise_name: 'Dumbbell Lunges',
//       Exercise_image: 'dumbbell-lunge.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Quads (Quadriceps)',
//     },
//     {
//       Exercise_id: '39',
//       Exercise_name: 'Dumbbell Lunges',
//       Exercise_image: 'dumbbell-lunge.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Quads (Quadriceps)',
//     },
//     {
//       Exercise_id: '40',
//       Exercise_name: 'Dumbbell Romanian Deadlift',
//       Exercise_image: 'dumbbell-romanian-deadlift.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Hamstrings',
//     },
//     {
//       Exercise_id: '41',
//       Exercise_name: 'Goblet Squat',
//       Exercise_image: 'goblet-squat.png',
//       Exercise_type: 'Bodyweight Timed',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Quads (Quadriceps)',
//     },
//     {
//       Exercise_id: '42',
//       Exercise_name: 'Leg Extension',
//       Exercise_image: 'leg-extension.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Quads (Quadriceps)',
//     },
//     {
//       Exercise_id: '43',
//       Exercise_name: 'Leg Curl',
//       Exercise_image: 'seated-leg-curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Hamstrings',
//     },
//     {
//       Exercise_id: '44',
//       Exercise_name: 'Lying Leg Curl',
//       Exercise_image: 'lying-leg-curl.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Hamstrings',
//     },
//     {
//       Exercise_id: '45',
//       Exercise_name: 'Machine Standing Calf Raise',
//       Exercise_image: 'machine-standing-calf-raise.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Calves (Gastrocnemius)',
//     },
//     {
//       Exercise_id: '46',
//       Exercise_name: 'Seated Calf Raise',
//       Exercise_image: 'seated-calf-raise.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Calves (Soleus)',
//     },
//     {
//       Exercise_id: '47',
//       Exercise_name: 'Smith Maching Squats',
//       Exercise_image: 'smith-machine-squat.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Legs',
//       primaryMuscle: 'Quads (Quadriceps)',
//     },
//     {
//       Exercise_id: '48',
//       Exercise_name: 'Cable Overhead Tricep Extension',
//       Exercise_image: 'cable-overhead-tricep-extension.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Triceps',
//       primaryMuscle: 'Triceps (Long Head)',
//     },
//     {
//       Exercise_id: '49',
//       Exercise_name: 'Single Arm Dumbbell Tricep Extension',
//       Exercise_image: 'single_arm_dumbbell_extension.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Triceps',
//       primaryMuscle: 'Triceps (Long Head)',
//     },
//     {
//       Exercise_id: '50',
//       Exercise_name: 'Triceps Rope Pushdown',
//       Exercise_image: 'tricep_rope_pushdown.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Triceps',
//       primaryMuscle: 'Triceps (Lateral Head)',
//     },
//     {
//       Exercise_id: '51',
//       Exercise_name: 'Dumbbell Tricep Kickback',
//       Exercise_image: 'dumbbell-tricep-kickback.png',
//       Exercise_type: 'Weighted Reps',
//       muscleGroup: 'Triceps',
//       primaryMuscle: 'Triceps (Lateral Head)',
//     },
//   ];

//   getActionSheetButtons(exerciseId: string) {
//     return [
//       {
//         text: 'Replace Exercise',
//         role: 'replace',
//         icon: 'sync-outline',
//         handler: () => {
//           console.log('Replace clicked from exercise : ', exerciseId);
//           // this.isModalOpen = true;
//           this.openModal(exerciseId);
//         },
//         data: {
//           action: 'replace',
//         },
//       },
//       // {
//       //   text: 'Reorder Exercise',
//       //   role: 'reorder',
//       //   icon: 'swap-vertical-outline',
//       //   data: {
//       //     action: 'reorder',
//       //   },
//       //   handler: () => {
//       //     console.log('Reorder Exercises of Split : ', this.splitId);
//       //     this.navCtrl.navigateForward('/reorder-exercises', {
//       //       queryParams: { split_id: this.splitId },
//       //     });
//       //   },
//       // },
//       {
//         text: 'Delete Exercise\u00A0\u00A0',
//         role: 'destructive',
//         icon: 'trash-outline',
//         data: {
//           action: 'delete',
//         },
//       },
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         data: {
//           action: 'cancel',
//         },
//       },
//     ];
//   }

//   constructor(
//     private navCtrl: NavController,
//     private route: ActivatedRoute,
//     private splitService: SplitService,
//     private toastController: ToastController,
//     private workoutService: WorkoutService,
//     private modalCtrl: ModalController,
//     private cdr: ChangeDetectorRef
//   ) {}

//   groupedSessions: any[] = [];
//   splitId!: number;
//   splitName: string = '';
//   selectedExerciseIds: Set<SplitExercise> = new Set();
//   defaultDay!: string;
//   lastWorkoutSession?: lastWorkoutSession;
//   isRefreshing: boolean = false;
//   searchQuery = '';
//   selectionTimestamps: Map<string, number> = new Map();
//   editSelectedExerciseIds: Set<string> = new Set();

//   selectedExercises: ExerciseWithOrder[] = [];

//   ngOnInit() {
//     //fetching split id from query params
//     this.route.queryParams.subscribe((params) => {
//       this.splitId = params['split_id'];
//       if (this.splitId) {
//         console.log('Split ID from query param:', this.splitId);
//         //fetching split data from db using split id
//         this.splitService.getSplit(this.splitId).subscribe({
//           next: (data) => {
//             this.splitName = data.splitName;
//             this.selectedExerciseIds = new Set(data.exerciseIds);
//             console.log("this.selectedExerciseIds : ", this.selectedExerciseIds);
//             this.defaultDay = data.defaultDay;

//             // initialize setInputs and timestamps
//             this.selectedExerciseIds.forEach((exercise) => {
//               this.setInputs[exercise.exerciseId] = [
//                 { weight: undefined, reps: undefined, time: undefined },
//                 { weight: undefined, reps: undefined, time: undefined },
//                 { weight: undefined, reps: undefined, time: undefined },
//               ];
//               this.selectionTimestamps.set(exercise.exerciseId, Date.now());
//             });

//             // compute selectedExercises after initial data load
//             this.recomputeSelectedExercises();
//             this.cdr.markForCheck();
//           },
//           error: (err) => {
//             console.error('Error loading Split:', err);
//           },
//         });

//         //fetching last workout session data for the split
//         this.workoutService.getLastSessionBySplitId(this.splitId).subscribe({
//           next: (session) => {
//             //is last session data is null then create a new empty session data
//             if (session == null) {
//               // no previous session: seed lastSessionData with empty sets
//               this.groupedSessions = this.selectedExercises.map((exercise) => ({
//                 exerciseId: exercise.Exercise_id,
//                 setData: Array.from({ length: 3 }).map(() => ({
//                   weight: '0',
//                   reps: '0',
//                   time: '0',
//                 })),
//               }));
//               this.groupedSessions.forEach((ex) => {
//                 this.lastSessionData[ex.exerciseId] = ex.setData;
//               });
//             } else {
//               this.lastWorkoutSession = session;
//               const exerciseMap = new Map<string,{ exerciseId: string; setData: any[] }>();
//               session.exerciseLogs.forEach((log) => {
//                 const id = log.exerciseId;
//                 const existing = exerciseMap.get(id);
//                 const setData = {
//                   weight: log.weight ?? undefined,
//                   reps: log.reps ?? undefined,
//                   time: log.timeInSeconds ?? undefined,
//                 };
//                 if (existing) {
//                   existing.setData.push(setData);
//                 } else {
//                   exerciseMap.set(id, {
//                     exerciseId: id,
//                     setData: [setData],
//                   });
//                 }
//               });
//               this.groupedSessions = Array.from(exerciseMap.values());

//               this.groupedSessions.forEach((exId) => {
//                 this.lastSessionData[exId.exerciseId] = exId.setData.map(
//                   (set: any) => ({
//                     weight: set.weight,
//                     reps: set.reps,
//                     time: set.time,
//                   })
//                 );
//               });

//               // create setInputs aligned with lastSessionData sizes per selected exercise
//               this.selectedExerciseIds.forEach((exercise) => {
//                 const groupedSets = this.groupedSessions.filter(
//                   (s) => s.exerciseId === exercise.exerciseId
//                 );
//                 const setInputsForExercise: { weight?: number; reps?: number; time?: string; }[] = [];
//                 groupedSets.forEach((session) => {
//                   session.setData.forEach(() => {
//                     setInputsForExercise.push({
//                       weight: undefined,
//                       reps: undefined,
//                       time: undefined,
//                     });
//                   });
//                 });
//                 this.setInputs[exercise.exerciseId] = setInputsForExercise;
//               });
//             }
//             this.cdr.markForCheck();
//           },
//           error: (err) => {
//             console.error('Failed to fetch last session:', err);
//           },
//         });
//       }
//     });
//   }

//   // Build selectedExercises once per relevant change
//   private recomputeSelectedExercises(): void {
//     const orderMap = new Map<string, number>();
//     for (const e of this.selectedExerciseIds) {
//       orderMap.set(e.exerciseId, e.sortOrder ?? 0);
//     }

//     this.selectedExercises = this.exercises
//       .filter(ex => orderMap.has(ex.Exercise_id))
//       .map(ex => ({
//         ...ex,
//         sortOrder: orderMap.get(ex.Exercise_id) ?? 0,
//       }))
//       .sort((a, b) => a.sortOrder - b.sortOrder);
//   }

//   trackByExerciseId = (_: number, ex: Exercise) => ex.Exercise_id;

//   async openModal(exerciseId: string) {
//     const modal = await this.modalCtrl.create({
//       component: ReplaceExerciseModal,
//       componentProps: { exerciseId },
//     });
//     await modal.present();

//     const { data, role } = await modal.onWillDismiss();
//     if (role === 'confirm' && data) {
//       console.log('Modal confirmed with data:', data);

//       // Check if the new exercise is already selected
//       const exists = Array.from(this.selectedExerciseIds)
//         .some(e => e.exerciseId === data);

//       if (!exists) {
//         // Remove old exercise from the set immutably (new Set)
//         const newSet = new Set(this.selectedExerciseIds);
//         newSet.forEach(e => {
//           if (e.exerciseId === exerciseId) {
//             newSet.delete(e);
//           }
//         });

//         // Add new exercise with same or default sort order
//         // Preserve the old one's sortOrder if available
//         const old = Array.from(this.selectedExerciseIds).find(e => e.exerciseId === exerciseId);
//         const preservedOrder = old?.sortOrder ?? 0;

//         newSet.add({
//           exerciseId: data,
//           sortOrder: preservedOrder
//         });

//         this.selectedExerciseIds = newSet;

//         // Populate default sets for the new exercise if needed
//         const emptySet: any = { weight: 0, reps: 0, time: '0' };
//         if (!this.lastSessionData[data]) {
//           this.lastSessionData[data] = [];
//           this.setInputs[data] = [];
//         }
//         Array.from({ length: 3 }).forEach(() => {
//           this.lastSessionData[data].push({ ...emptySet });
//           this.setInputs[data].push({ ...emptySet });
//         });

//         // Recompute selectedExercises
//         this.recomputeSelectedExercises();
//         this.cdr.markForCheck();
//       }
//     }
//   }

//   limitLength(event: any, maxLength: number) {
//     const input = event.target;
//     if (input.value && input.value.length > maxLength) {
//       input.value = input.value.slice(0, maxLength);
//     }
//   }

//   get selectedExercises() {

//     const orderMap = new Map<string, number>();
//     for (const e of this.selectedExerciseIds) {
//       console.log('e : ', e);
//       orderMap.set(e.exerciseId, e.sortOrder ?? 0);
//     }
//     console.log('orderMap : ', orderMap);

//     return this.exercises
//       .filter(ex =>
//         Array.from(this.selectedExerciseIds).some(
//           (e: any) => e.exerciseId === ex.Exercise_id
//         )
//       )
//       .sort((a, b) => {
//         const orderA = (Array.from(this.selectedExerciseIds).find(
//           (e: any) => e.exerciseId === a.Exercise_id
//         ) as any)?.sortOrder ?? 0;

//         const orderB = (Array.from(this.selectedExerciseIds).find(
//           (e: any) => e.exerciseId === b.Exercise_id
//         ) as any)?.sortOrder ?? 0;

//         return orderA - orderB;
//       });
//   }

//   // get selectedExercises() {
//   //   const orderMap = new Map<string, number>();
//   //   for (const e of this.selectedExerciseIds) {
//   //     orderMap.set(e.exerciseId, e.sortOrder ?? 0);
//   //   }

//   //   return this.exercises
//   //     .filter(ex => orderMap.has(ex.Exercise_id))
//   //     .map(ex => ({
//   //       ...ex,
//   //       sortOrder: orderMap.get(ex.Exercise_id) ?? 0,
//   //     }))
//   //     .sort((a, b) => a.sortOrder - b.sortOrder);
//   // }

//   goBack() {
//     this.navCtrl.back();
//   }

//   convertTimeToSeconds(timeStr: string): number {
//     const [minutes, seconds] = timeStr.split(':').map(Number);
//     return minutes * 60 + seconds;
//   }

//   async saveWorkout() {
//     const logs: any[] = [];

//     this.selectedExercises.forEach((ex) => {
//       const sets = this.setInputs[ex.Exercise_id] || [];
//       sets.forEach((set, index) => {
//         const log = {
//           ExerciseId: ex.Exercise_id,
//           SetNumber: index + 1,
//           Reps: set.reps ?? null,
//           Weight: set.weight ?? null,
//           TimeInSeconds: set.time ?? null,
//           // TimeInSeconds: set.time ? this.convertTimeToSeconds(set.time) : null
//         };
//         logs.push(log);
//       });
//     });

//     let isSessionValid = logs.every((log) => {
//       let logExerciseType = this.exercises.find(
//         (ex) => ex.Exercise_id === log.ExerciseId
//       )?.Exercise_type;

//       if (logExerciseType === 'Weighted Reps') {
//         // return log.Reps != null && log.Weight != null;
//         return log.Reps > 0 && log.Weight > 0;
//       } else if (logExerciseType === 'Bodyweight Reps') {
//         return log.Reps != null;
//       } else if (logExerciseType === 'Bodyweight Timed') {
//         return log.Time != null;
//       }

//       // If type is unknown, assume invalid
//       return false;
//     });

//     console.log('isSessionValid', isSessionValid);

//     if (!isSessionValid) {
//       const toast = await this.toastController.create({
//         message: 'Your workout has no valid sets',
//         duration: 3000,
//         color: 'danger',
//         position: 'bottom',
//       });
//       await toast.present();
//     } else {
//       const workoutPayload = {
//         SplitId: this.splitId,
//         StartTime: new Date().toISOString(),
//         ExerciseLogs: logs,
//       };
//       console.log('Workout Payload:', workoutPayload);
//       this.workoutService.createWorkoutSession(workoutPayload).subscribe({
//         next: (response) => {
//           console.log('Workout saved:', response);
//           this.navCtrl.back();
//         },
//         error: (err) => {
//           console.error('Error saving workout:', err);
//         },
//       });
//     }
//   }

//   doRefresh(event: RefresherCustomEvent) {
//     this.isRefreshing = true;
//     setTimeout(() => {
//       window.location.reload();
//       this.isRefreshing = false;
//       event.target.complete();
//     }, 1000);
//   }

//   addMoreSets(exerciseId: string) {
//     console.log('Add More Set Clicked : ', exerciseId);
//     var emptySet: any = { weight: 0, reps: 0, time: '0' };
//     if (!this.lastSessionData[exerciseId]) {
//       this.lastSessionData[exerciseId] = [];
//       this.setInputs[exerciseId] = [];
//     }
//     this.lastSessionData[exerciseId].push({ ...emptySet });
//     this.setInputs[exerciseId].push({ ...emptySet });
//     console.log(
//       'this.lastSessionData after adding new set : ',
//       this.lastSessionData
//     );
//   }

//   deleteSet(setNumber: number, exerciseId: string) {
//     console.log('delete set : ', exerciseId, setNumber);
//     this.lastSessionData[exerciseId].splice(setNumber, 1);
//     this.setInputs[exerciseId].splice(setNumber, 1);
//   }

//   editActionHandler(event: CustomEvent<OverlayEventDetail>, exerciseId: string) {
//     if (event.detail.role === 'destructive') {
//       const toDelete = Array.from(this.selectedExerciseIds).find(
//         (e: any) => e.exerciseId === exerciseId
//       );
//       if (toDelete) {
//         this.selectedExerciseIds.delete(toDelete);
//       }
//       this.selectionTimestamps.delete(exerciseId);
//     } else if (event.detail.role === 'replace') {
//       console.log('replace clicked');
//     } else if (event.detail.role === 'reorder') {
//       console.log('reorder clicked');
//     }
//   }

//   addExercise() {
//     console.log('Add Exercise Clicked');
//   }

//   cancel() {
//     this.modal.dismiss(null, 'cancel');
//   }

//   confirm() {
//     this.modal.dismiss(null, 'confirm');
//     this.editSelectedExerciseIds.forEach((id) => {
//       const exists = Array.from(this.selectedExerciseIds).some(
//         (e: any) => e.exerciseId === id
//       );
//       if (!exists) {
//         this.selectedExerciseIds.add({
//           exerciseId: id,
//           sortOrder: this.selectedExerciseIds.size + 1,
//         });
//       }
//     });
//   }

//   onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
//     if (event.detail.role === 'confirm') {
//       // this.message = `Hello, ${event.detail.data}!`;
//     }
//   }

//   toggleExerciseSelection(id: string) {
//     console.log('toggle : ', this.selectedExerciseIds);
//     const existing = Array.from(this.selectedExerciseIds).find(
//       (e: any) => e.exerciseId === id
//     );
//     if (existing) {
//       this.selectedExerciseIds.delete(existing);
//       this.selectionTimestamps.delete(id);
//     } else {
//       if (this.lastSessionData[id]) {
//         this.setInputs[id] = [];
//         this.lastSessionData[id].forEach((set) => {
//           const tempSet = {
//             weight: set.weight,
//             reps: set.reps,
//             time: set.time,
//           };
//           this.setInputs[id].push({ ...tempSet });
//         });
//       } else {
//         const emptySet = { weight: 0, reps: 0, time: '0' };
//         this.lastSessionData[id] = [];
//         this.setInputs[id] = [];
//         Array.from({ length: 3 }).forEach(() => {
//           this.lastSessionData[id].push({ ...emptySet });
//           this.setInputs[id].push({ ...emptySet });
//         });
//       }
//       this.selectedExerciseIds.add({
//         exerciseId: id,
//         sortOrder: this.selectedExerciseIds.size + 1,
//       });
//       this.editSelectedExerciseIds.add(id);
//       this.selectionTimestamps.set(id, Date.now());
//     }
//   }

//   isSelected(id: string): boolean {
//     return Array.from(this.selectedExerciseIds).some(
//       (e: any) => e.exerciseId === id
//     );
//   }

//   get filteredExercises() {
//     return this.exercises.filter((e) =>
//         e.Exercise_name.toLowerCase().includes(this.searchQuery.toLowerCase())
//       ).sort((a, b) => {
//         const aTime = this.selectionTimestamps.get(a.Exercise_id);
//         const bTime = this.selectionTimestamps.get(b.Exercise_id);
//         if (aTime && bTime) {
//           return aTime - bTime;
//         } else if (aTime) {
//           return -1;
//         } else if (bTime) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//   }
// }

import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import {
  NavController,
  ToastController,
  RefresherCustomEvent,
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SplitExercise, SplitService } from '../services/split.service';
import {
  WorkoutService,
  lastWorkoutSession,
} from '../services/workoutSession.service';
import { IonModal, ModalController } from '@ionic/angular';
import { ReplaceExerciseModal } from './components/replace-exercise.component';
import type { OverlayEventDetail } from '@ionic/core';

interface Exercise {
  Exercise_id: string;
  Exercise_name: string;
  Exercise_image: string;
  Exercise_type: string;
  muscleGroup: string;
  primaryMuscle: string;
}

type ExerciseWithOrder = Exercise & { sortOrder: number };

@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.page.html',
  styleUrls: ['./start-workout.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartWorkoutPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  setInputs: {
    [exerciseId: string]: {
      weight?: number;
      reps?: number;
      time?: string;
    }[];
  } = {};

  lastSessionData: {
    [exerciseId: string]: {
      weight?: number;
      reps?: number;
      time?: string;
    }[];
  } = {};

  exercises: Exercise[] = [
    {
      Exercise_id: '1',
      Exercise_name: 'Barbell Back Squat',
      Exercise_image: 'barbell-squat.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '2',
      Exercise_name: 'Deadlift',
      Exercise_image: 'deadlift.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Other',
      primaryMuscle: 'Hamstrings',
    },
    {
      Exercise_id: '3',
      Exercise_name: 'Bench Press',
      Exercise_image: 'barbell-bench-press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '4',
      Exercise_name: 'Dumbbell Bench Press',
      Exercise_image: 'dumbbell_bench_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '5',
      Exercise_name: 'Incline Bench Press',
      Exercise_image: 'incline_bench_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '6',
      Exercise_name: 'Incline Dumbbell Bench Press',
      Exercise_image: 'incline_dumbbell_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '7',
      Exercise_name: 'Decline Bench Press',
      Exercise_image: 'decline_bench_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '8',
      Exercise_name: 'Decline Dumbbell Bench Press',
      Exercise_image: 'decline_dumbbell_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '9',
      Exercise_name: 'Pec Deck',
      Exercise_image: 'pec_dec.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '10',
      Exercise_name: 'Lower Chest Cable Press',
      Exercise_image: 'lower_chest_cable_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '11',
      Exercise_name: 'Dumbbell Overhead Shoulder Press',
      Exercise_image: 'dumbbell_shoulder_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
    },
    {
      Exercise_id: '12',
      Exercise_name: 'Arnold Press',
      Exercise_image: 'arnold_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
    },
    {
      Exercise_id: '13',
      Exercise_name: 'Dumbbell Shoulder Lateral Raise',
      Exercise_image: 'dumbbell_lateral_raise.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
    },
    {
      Exercise_id: '14',
      Exercise_name: 'Cable Shoulder Lateral Raise',
      Exercise_image: 'cable_lateral_raise.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Shoulders',
      primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
    },
    {
      Exercise_id: '15',
      Exercise_name: 'Barbell Curl',
      Exercise_image: 'barbell_curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '16',
      Exercise_name: 'Romanian Deadlift',
      Exercise_image: 'barbell_romanian_deadlift.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      Exercise_id: '17',
      Exercise_name: 'Incline Dumbbell Bench Press',
      Exercise_image: 'incline_dumbbell_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '18',
      Exercise_name: 'Leg Press',
      Exercise_image: 'machine_leg_press.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '19',
      Exercise_name: 'Plank',
      Exercise_image: 'plank.png',
      Exercise_type: 'Bodyweight Timed',
      muscleGroup: 'Core',
      primaryMuscle: 'Abdominals (Rectus Abdominis)',
    },
    {
      Exercise_id: '20',
      Exercise_name: 'Pull Ups',
      Exercise_image: 'pullup.png',
      Exercise_type: 'Bodyweight Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Lats (Latissimus Dorsi)',
    },
    {
      Exercise_id: '21',
      Exercise_name: 'Push Ups',
      Exercise_image: 'pushup.png',
      Exercise_type: 'Bodyweight Reps',
      muscleGroup: 'Chest',
      primaryMuscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '22',
      Exercise_name: 'Seated Cable Row',
      Exercise_image: 'seated_cable_row.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '23',
      Exercise_name: 'Triceps Pushdown',
      Exercise_image: 'triceps_pushdown.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Triceps (Triceps Brachii)',
    },
    {
      Exercise_id: '24',
      Exercise_name: 'Bent Over Barbell Row',
      Exercise_image: 'bent-over-row.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '25',
      Exercise_name: 'Close Grip Lat Pulldown',
      Exercise_image: 'close-grip-lat-pulldown.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '26',
      Exercise_name: 'Lat Pulldown',
      Exercise_image: 'lat-pulldown.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Upper Back (Trapezius)',
    },
    {
      Exercise_id: '27',
      Exercise_name: 'Reverse Grip Lat Pulldown',
      Exercise_image: 'reverse-grip-lat-pulldown.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '28',
      Exercise_name: 'Straight Arm Pulldown',
      Exercise_image: 'straight-arm-pulldown.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '29',
      Exercise_name: 'Single Arm Dumbbell Row',
      Exercise_image: 'single-arm-dumbbell-row.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '30',
      Exercise_name: 'Machine Rows',
      Exercise_image: 'machine-row.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '31',
      Exercise_name: 'Machine Reverse Fly',
      Exercise_image: 'machine-reverse-fly.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Rear Shoulders (Posterior Deltoid)',
    },
    {
      Exercise_id: '32',
      Exercise_name: 'Dumbbell Shrug',
      Exercise_image: 'dumbbell-shrug.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Back',
      primaryMuscle: 'Upper Back (Trapezius)',
    },
    {
      Exercise_id: '33',
      Exercise_name: 'Prechure Curl',
      Exercise_image: 'prechure_curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '34',
      Exercise_name: 'Incline Dumbbell Curl',
      Exercise_image: 'incline_dumbbell_curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Long Head)',
    },
    {
      Exercise_id: '35',
      Exercise_name: 'Hammer Curl',
      Exercise_image: 'hammer_curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Brachialis)',
    },
    {
      Exercise_id: '36',
      Exercise_name: 'Dumbbell Curl',
      Exercise_image: 'dumbbell_curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '37',
      Exercise_name: 'Cable Curl',
      Exercise_image: 'cable_curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Arms',
      primaryMuscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '38',
      Exercise_name: 'Dumbbell Lunges',
      Exercise_image: 'dumbbell-lunge.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '39',
      Exercise_name: 'Dumbbell Lunges',
      Exercise_image: 'dumbbell-lunge.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '40',
      Exercise_name: 'Dumbbell Romanian Deadlift',
      Exercise_image: 'dumbbell-romanian-deadlift.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      Exercise_id: '41',
      Exercise_name: 'Goblet Squat',
      Exercise_image: 'goblet-squat.png',
      Exercise_type: 'Bodyweight Timed',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '42',
      Exercise_name: 'Leg Extension',
      Exercise_image: 'leg-extension.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '43',
      Exercise_name: 'Leg Curl',
      Exercise_image: 'seated-leg-curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      Exercise_id: '44',
      Exercise_name: 'Lying Leg Curl',
      Exercise_image: 'lying-leg-curl.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Hamstrings',
    },
    {
      Exercise_id: '45',
      Exercise_name: 'Machine Standing Calf Raise',
      Exercise_image: 'machine-standing-calf-raise.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Calves (Gastrocnemius)',
    },
    {
      Exercise_id: '46',
      Exercise_name: 'Seated Calf Raise',
      Exercise_image: 'seated-calf-raise.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Calves (Soleus)',
    },
    {
      Exercise_id: '47',
      Exercise_name: 'Smith Maching Squats',
      Exercise_image: 'smith-machine-squat.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Legs',
      primaryMuscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '48',
      Exercise_name: 'Cable Overhead Tricep Extension',
      Exercise_image: 'cable-overhead-tricep-extension.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Long Head)',
    },
    {
      Exercise_id: '49',
      Exercise_name: 'Single Arm Dumbbell Tricep Extension',
      Exercise_image: 'single_arm_dumbbell_extension.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Long Head)',
    },
    {
      Exercise_id: '50',
      Exercise_name: 'Triceps Rope Pushdown',
      Exercise_image: 'tricep_rope_pushdown.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Lateral Head)',
    },
    {
      Exercise_id: '51',
      Exercise_name: 'Dumbbell Tricep Kickback',
      Exercise_image: 'dumbbell-tricep-kickback.png',
      Exercise_type: 'Weighted Reps',
      muscleGroup: 'Triceps',
      primaryMuscle: 'Triceps (Lateral Head)',
    },
  ];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private splitService: SplitService,
    private toastController: ToastController,
    private workoutService: WorkoutService,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef
  ) {}

  groupedSessions: any[] = [];
  splitId!: number;
  splitName: string = '';
  selectedExerciseIds: Set<SplitExercise> = new Set();
  defaultDay!: string;
  lastWorkoutSession?: lastWorkoutSession;
  isRefreshing: boolean = false;
  searchQuery = '';
  selectionTimestamps: Map<string, number> = new Map();
  editSelectedExerciseIds: Set<string> = new Set();

  // Cached derived data to avoid getter recomputation
  selectedExercises: ExerciseWithOrder[] = [];

  getActionSheetButtons(exerciseId: string) {
    return [
      {
        text: 'Replace Exercise',
        role: 'replace',
        icon: 'sync-outline',
        handler: () => {
          console.log('Replace clicked from exercise : ', exerciseId);
          // this.isModalOpen = true;
          this.openModal(exerciseId);
        },
        data: {
          action: 'replace',
        },
      },
      // {
      //   text: 'Reorder Exercise',
      //   role: 'reorder',
      //   icon: 'swap-vertical-outline',
      //   data: {
      //     action: 'reorder',
      //   },
      //   handler: () => {
      //     console.log('Reorder Exercises of Split : ', this.splitId);
      //     this.navCtrl.navigateForward('/reorder-exercises', {
      //       queryParams: { split_id: this.splitId },
      //     });
      //   },
      // },
      {
        text: 'Delete Exercise\u00A0\u00A0',
        role: 'destructive',
        icon: 'trash-outline',
        data: {
          action: 'delete',
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.splitId = params['split_id'];
      if (this.splitId) {
        this.splitService.getSplit(this.splitId).subscribe({
          next: (data) => {
            console.log('Split Data:', data);
            this.splitName = data.splitName;
            this.selectedExerciseIds = new Set(data.exerciseIds);
            console.log('Selected Exercise IDs:', this.selectedExerciseIds);
            this.defaultDay = data.defaultDay;

            // initialize setInputs and timestamps
            this.selectedExerciseIds.forEach((exercise) => {
              this.setInputs[exercise.exerciseId] = [
                { weight: undefined, reps: undefined, time: undefined },
                { weight: undefined, reps: undefined, time: undefined },
                { weight: undefined, reps: undefined, time: undefined },
              ];
              this.selectionTimestamps.set(exercise.exerciseId, Date.now());
            });

            // compute selectedExercises after initial data load
            this.recomputeSelectedExercises();
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error('Error loading Split:', err);
          },
        });

        //   this.workoutService.getLastSessionBySplitId(this.splitId).subscribe({
        //     next: (session) => {
        //       console.log('Last Workout Session Data : ', session);
        //       if (session == null) {
        //         // no previous session: seed lastSessionData with empty sets
        //         this.groupedSessions = this.selectedExercises.map((exercise) => ({
        //           exerciseId: exercise.Exercise_id,
        //           setData: Array.from({ length: 3 }).map(() => ({
        //             weight: '0',
        //             reps: '0',
        //             time: '0',
        //           })),
        //         }));
        //         this.groupedSessions.forEach((ex) => {
        //           this.lastSessionData[ex.exerciseId] = ex.setData;
        //         });
        //       } else {
        //         this.lastWorkoutSession = session;
        //         const exerciseMap = new Map<string, { exerciseId: string; setData: any[] }>();
        //         session.exerciseLogs.forEach((log) => {
        //           const id = log.exerciseId;
        //           const existing = exerciseMap.get(id);
        //           const setData = {
        //             weight: log.weight ?? "0",
        //             reps: log.reps ?? "0",
        //             time: log.timeInSeconds ?? "0",
        //           };
        //           if (existing) {
        //             existing.setData.push(setData);
        //           } else {
        //             exerciseMap.set(id, {
        //               exerciseId: id,
        //               setData: [setData],
        //             });
        //           }
        //         });
        //         this.groupedSessions = Array.from(exerciseMap.values());

        //         console.log('Grouped Sessions:', this.groupedSessions);
        //         this.groupedSessions.forEach((exId) => {
        //           this.lastSessionData[exId.exerciseId] = exId.setData.map((set: any) => ({
        //               weight: set.weight || 0,
        //               reps: set.reps || 0,
        //               time: set.time || 0,
        //             })
        //           );
        //         });

        //         const emptySets = Array.from({ length: 3 }, () => ({
        //           weight: 0,
        //           reps: 0,
        //           time: 0,
        //         }));

        //         // this.selectedExerciseIds.forEach((exerciseId) => {
        //         //   if (!this.lastSessionData[exerciseId]) {
        //         //     this.lastSessionData[exerciseId] = [...emptySets];
        //         //   }
        //         // });

        //         // create setInputs aligned with lastSessionData sizes per selected exercise
        //         this.selectedExerciseIds.forEach((exercise) => {
        //           const groupedSets = this.groupedSessions.filter(
        //             (s) => s.exerciseId === exercise.exerciseId
        //           );
        //           const setInputsForExercise: {
        //             weight?: number;
        //             reps?: number;
        //             time?: string;
        //           }[] = [];
        //           groupedSets.forEach((session) => {
        //             session.setData.forEach(() => {
        //               setInputsForExercise.push({
        //                 weight: undefined,
        //                 reps: undefined,
        //                 time: undefined,
        //               });
        //             });
        //           });
        //           this.setInputs[exercise.exerciseId] = setInputsForExercise;
        //         });
        //       }
        //       this.cdr.markForCheck();
        //     },
        //     error: (err) => {
        //       console.error('Failed to fetch last session:', err);
        //     },
        //   });

        this.workoutService.getLastSessionBySplitId(this.splitId).subscribe({
          next: (session) => {
            console.log('Last Workout Session Data : ', session);

            this.lastSessionData = (this.lastSessionData ?? {}) as Record<string, { weight: number; reps: number; time: string }[]>;
            this.groupedSessions = [];
            const emptySetsNum = 3;

            const makeEmptySets = (n = emptySetsNum) => Array.from({ length: n }, () => ({
              weight: 0,
              reps: 0,
              time: '0',
            }));

            if (session == null) {
              // No previous session: seed groupedSessions from selectedExercises with 3 empty sets
              this.groupedSessions = (this.selectedExercises ?? []).map(
                (exercise: any) => ({
                  exerciseId: String(exercise.Exercise_id),
                  setData: makeEmptySets(emptySetsNum),
                })
              );
              this.groupedSessions.forEach((ex) => {
                this.lastSessionData[ex.exerciseId] = ex.setData;
              });
            } else {
              this.lastWorkoutSession = session;
              // 1) Group session.exerciseLogs by exerciseId
              const exerciseMap = new Map<
                string,
                {
                  exerciseId: string;
                  setData: { weight: number; reps: number; time: string }[];
                }
              >();
              const toStr = (n: unknown) => String(n ?? '0');
              (session.exerciseLogs ?? []).forEach((log: any) => {
                const id = String(log.exerciseId);
                const existing = exerciseMap.get(id);
                const setData = {
                  weight: Number(log.weight ?? 0),
                  reps: Number(log.reps ?? 0),
                  time: toStr(log.timeInSeconds),
                };
                if (existing) {
                  existing.setData.push(setData);
                } else {
                  exerciseMap.set(id, { exerciseId: id, setData: [setData] });
                }
              });

              // 2) Build groupedSessions from map
              this.groupedSessions = Array.from(exerciseMap.values());
              console.log('Grouped Sessions:', this.groupedSessions);
              
              // 3) Fill lastSessionData from groupedSessions with numeric normalization
              this.groupedSessions.forEach((ex) => {
                this.lastSessionData[ex.exerciseId] = ex.setData.map(
                  (set: any) => ({
                    weight: Number(set.weight) || 0,
                    reps: Number(set.reps) || 0,
                    time: toStr(set.timeInSeconds) || '0',
                  })
                );
              });

              // 4) Ensure every selected exerciseId exists in lastSessionData with 3 sets
              (this.selectedExerciseIds ?? []).forEach((exercise: any) => {
                const id = String(exercise.exerciseId);
                if (!this.lastSessionData[id]) {
                  this.lastSessionData[id] = makeEmptySets(emptySetsNum);
                } else if (this.lastSessionData[id].length < emptySetsNum) {
                  // Optional: pad to 3 sets if fewer present
                  const toAdd = emptySetsNum - this.lastSessionData[id].length;
                  this.lastSessionData[id].push(...makeEmptySets(toAdd));
                }
              });

              // 5) Reconcile groupedSessions with selected exercises
              //    Add entries for selected exercises missing from groupedSessions so downstream logic aligns.
              const groupedIds = new Set(
                this.groupedSessions.map((g) => g.exerciseId)
              );
              (this.selectedExerciseIds ?? []).forEach((exercise: any) => {
                const id = String(exercise.exerciseId);
                if (!groupedIds.has(id)) {
                  this.groupedSessions.push({
                    exerciseId: id,
                    setData: [...this.lastSessionData[id]], // already ensured above
                  });
                }
              });

              // 6) Build setInputs aligned with lastSessionData count per selected exercise
              (this.selectedExerciseIds ?? []).forEach((exercise: any) => {
                const id = String(exercise.exerciseId);
                const sets =
                  this.lastSessionData[id] ?? makeEmptySets(emptySetsNum);
                const setInputsForExercise = sets.map(() => ({
                  weight: undefined as number | undefined,
                  reps: undefined as number | undefined,
                  time: undefined as string | undefined,
                }));
                this.setInputs[id] = setInputsForExercise;
              });
            }
            this.cdr?.markForCheck?.();
          },
          error: (err) => {
            console.error('Failed to fetch last session:', err);
          },
        });
      }
    });
  }

  // Build selectedExercises once per relevant change
  private recomputeSelectedExercises(): void {
    const orderMap = new Map<string, number>();
    for (const e of this.selectedExerciseIds) {
      orderMap.set(e.exerciseId, e.sortOrder ?? 0);
    }

    this.selectedExercises = this.exercises
      .filter((ex) => orderMap.has(ex.Exercise_id))
      .map((ex) => ({
        ...ex,
        sortOrder: orderMap.get(ex.Exercise_id) ?? 0,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // trackBy for ngFor
  trackByExerciseId = (_: number, ex: Exercise) => ex.Exercise_id;

  async openModal(exerciseId: string) {
    const modal = await this.modalCtrl.create({
      component: ReplaceExerciseModal,
      componentProps: { exerciseId },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      console.log('Replace Exercise Called : ', data);

      // data is the new exerciseId to replace with
      const exists = Array.from(this.selectedExerciseIds).some(
        (e) => e.exerciseId === data
      );

      if (!exists) {
        // Remove old exercise from the set immutably (new Set)
        const newSet = new Set(this.selectedExerciseIds);
        newSet.forEach((e) => {
          if (e.exerciseId === exerciseId) {
            newSet.delete(e);
          }
        });

        // Add new exercise with same or default sort order
        // Preserve the old one's sortOrder if available
        const old = Array.from(this.selectedExerciseIds).find(
          (e) => e.exerciseId === exerciseId
        );
        const preservedOrder = old?.sortOrder ?? 0;

        newSet.add({
          exerciseId: data,
          sortOrder: preservedOrder,
        });

        this.selectedExerciseIds = newSet;
        console.log(
          'Selected Exercise IDs after replacement:',
          this.selectedExerciseIds
        );

        // Populate default sets for the new exercise if needed
        const emptySet: any = { weight: 0, reps: 0, time: '0' };
        console.log(
          'Last Session Data Before Replacement:',
          this.lastSessionData[data],
          this.setInputs[data]
        );

        // if (!this.lastSessionData[data]) {
        //   this.lastSessionData[data] = [];
        //   Array.from({ length: 3 }).forEach(() => {
        //     this.lastSessionData[data].push({ ...emptySet });
        //   });
        // }
        // if(!this.setInputs[data]) {
        //   this.setInputs[data] = [];
        //   Array.from({ length: 3 }).forEach(() => {
        //     this.setInputs[data].push({ ...emptySet });
        //   });
        // }

        const make3 = <T>(v: T) => [{ ...v }, { ...v }, { ...v }];
        this.lastSessionData[data] ??= make3({ weight: 0, reps: 0, time: '0' });
        this.setInputs[data] ??= make3({ weight: 0, reps: 0, time: '0' });

        // Recompute selectedExercises
        this.recomputeSelectedExercises();
        this.cdr.markForCheck();
      }
    }
  }

  limitLength(event: any, maxLength: number) {
    const input = event.target;
    if (input.value && input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }

  async saveWorkout() {
    const logs: any[] = [];

    this.selectedExercises.forEach((ex) => {
      const sets = this.setInputs[ex.Exercise_id] || [];
      sets.forEach((set, index) => {
        const log = {
          ExerciseId: ex.Exercise_id,
          SetNumber: index + 1,
          Reps: set.reps ?? null,
          Weight: set.weight ?? null,
          TimeInSeconds: set.time ?? null,
        };
        logs.push(log);
      });
    });

    const isSessionValid = logs.every((log) => {
      const logExerciseType = this.exercises.find(
        (ex) => ex.Exercise_id === log.ExerciseId
      )?.Exercise_type;

      if (logExerciseType === 'Weighted Reps') {
        return log.Reps > 0 && log.Weight > 0;
      } else if (logExerciseType === 'Bodyweight Reps') {
        return log.Reps != null;
      } else if (logExerciseType === 'Bodyweight Timed') {
        return log.TimeInSeconds != null;
      }
      return false;
    });

    if (!isSessionValid) {
      const toast = await this.toastController.create({
        message: 'Your workout has no valid sets',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
      await toast.present();
    } else {
      const workoutPayload = {
        SplitId: this.splitId,
        StartTime: new Date().toISOString(),
        ExerciseLogs: logs,
      };
      this.workoutService.createWorkoutSession(workoutPayload).subscribe({
        next: async () => {
          this.navCtrl.back();
          const toast = await this.toastController.create({
            message: 'Session Saved Successfully.',
            duration: 3000,
            color: 'success',
            position: 'bottom',
          });
          await toast.present();
        },
        error: (err) => {
          console.error('Error saving workout:', err);
        },
      });
    }
  }

  doRefresh(event: RefresherCustomEvent) {
    this.isRefreshing = true;
    setTimeout(() => {
      window.location.reload();
      this.isRefreshing = false;
      event.target.complete();
    }, 1000);
  }

  addMoreSets(exerciseId: string) {
    const emptySet: any = { weight: 0, reps: 0, time: '0' };
    if (!this.lastSessionData[exerciseId]) {
      this.lastSessionData[exerciseId] = [];
      this.setInputs[exerciseId] = [];
    }
    this.lastSessionData[exerciseId].push({ ...emptySet });
    this.setInputs[exerciseId].push({ ...emptySet });
  }

  deleteSet(setNumber: number, exerciseId: string) {
    this.lastSessionData[exerciseId].splice(setNumber, 1);
    this.setInputs[exerciseId].splice(setNumber, 1);
  }

  editActionHandler(
    event: CustomEvent<OverlayEventDetail>,
    exerciseId: string
  ) {
    if (event.detail.role === 'destructive') {
      const toDelete = Array.from(this.selectedExerciseIds).find(
        (e: any) => e.exerciseId === exerciseId
      );
      if (toDelete) {
        const newSet = new Set(this.selectedExerciseIds);
        newSet.delete(toDelete);
        this.selectedExerciseIds = newSet;
        this.selectionTimestamps.delete(exerciseId);

        // Recompute after deletion
        this.recomputeSelectedExercises();
        this.cdr.markForCheck();
      }
      console.log(
        'Delete clicked for exercise:',
        exerciseId,
        this.selectedExerciseIds
      );
    } else if (event.detail.role === 'replace') {
      // handled via openModal button handler
    } else if (event.detail.role === 'reorder') {
      // implement reorder flow if needed
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
    // immutably add new ids and recompute
    let changed = false;
    const newSet = new Set(this.selectedExerciseIds);
    this.editSelectedExerciseIds.forEach((id) => {
      const exists = Array.from(newSet).some((e: any) => e.exerciseId === id);
      if (!exists) {
        newSet.add({
          exerciseId: id,
          sortOrder: newSet.size + 1,
        });
        changed = true;
      }
    });
    if (changed) {
      this.selectedExerciseIds = newSet;
      this.recomputeSelectedExercises();
      this.cdr.markForCheck();
    }
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      // console.log('confirm clicked T-T');
    }
  }

  toggleExerciseSelection(id: string) {
    const existing = Array.from(this.selectedExerciseIds).find(
      (e: any) => e.exerciseId === id
    );
    const newSet = new Set(this.selectedExerciseIds);

    if (existing) {
      newSet.delete(existing);
      this.selectionTimestamps.delete(id);
    } else {
      if (this.lastSessionData[id]) {
        this.setInputs[id] = [];
        this.lastSessionData[id].forEach((set) => {
          const tempSet = {
            weight: set.weight,
            reps: set.reps,
            time: set.time,
          };
          this.setInputs[id].push({ ...tempSet });
        });
      } else {
        const emptySet = { weight: 0, reps: 0, time: '0' };
        this.lastSessionData[id] = [];
        this.setInputs[id] = [];
        Array.from({ length: 3 }).forEach(() => {
          this.lastSessionData[id].push({ ...emptySet });
          this.setInputs[id].push({ ...emptySet });
        });
      }
      newSet.add({
        exerciseId: id,
        sortOrder: newSet.size + 1,
      });
      this.editSelectedExerciseIds.add(id);
      this.selectionTimestamps.set(id, Date.now());
    }

    this.selectedExerciseIds = newSet;
    console.log(
      'Selected Exercise IDs after toggle:',
      this.selectedExerciseIds
    );
    this.recomputeSelectedExercises();
    this.cdr.markForCheck();
  }

  isSelected(id: string): boolean {
    return Array.from(this.selectedExerciseIds).some(
      (e: any) => e.exerciseId === id
    );
  }

  get filteredExercises() {
    const q = this.searchQuery.toLowerCase();
    return this.exercises
      .filter((e) => e.Exercise_name.toLowerCase().includes(q))
      .sort((a, b) => {
        const aTime = this.selectionTimestamps.get(a.Exercise_id);
        const bTime = this.selectionTimestamps.get(b.Exercise_id);
        if (aTime && bTime) {
          return aTime - bTime;
        } else if (aTime) {
          return -1;
        } else if (bTime) {
          return 1;
        } else {
          return 0;
        }
      });
  }

  goBack() {
    this.navCtrl.back();
  }

  convertTimeToSeconds(timeStr: string): number {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  }
}
