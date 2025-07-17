import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  WorkoutService,
  workoutSession,
} from '../services/workoutSession.service';
import { OverlayEventDetail } from '@ionic/core';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  splitName?: string;
  workoutSessions: workoutSession[] = [];
  groupedSessions: any[] = [];

  exercises = [
    {
      Exercise_id: '1',
      Exercise_name: 'Barbell Back Squat',
      Exercise_image: 'barbell-squat.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '2',
      Exercise_name: 'Deadlift',
      Exercise_image: 'deadlift.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Other',
      Primary_muscle: 'Hamstrings',
    },
    {
      Exercise_id: '3',
      Exercise_name: 'Bench Press',
      Exercise_image: 'barbell-bench-press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '4',
      Exercise_name: 'Dumbbell Bench Press',
      Exercise_image: 'dumbbell_bench_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '5',
      Exercise_name: 'Incline Bench Press',
      Exercise_image: 'incline_bench_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '6',
      Exercise_name: 'Incline Dumbbell Bench Press',
      Exercise_image: 'incline_dumbbell_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '7',
      Exercise_name: 'Decline Bench Press',
      Exercise_image: 'decline_bench_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '8',
      Exercise_name: 'Decline Dumbbell Bench Press',
      Exercise_image: 'decline_dumbbell_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '9',
      Exercise_name: 'Pec Deck',
      Exercise_image: 'pec_dec.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '10',
      Exercise_name: 'Lower Chest Cable Press',
      Exercise_image: 'lower_chest_cable_press.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Lower Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '11',
      Exercise_name: 'Dumbbell Overhead Shoulder Press',
      Exercise_image: 'dumbbell_shoulder_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Shoulders',
      Primary_muscle: 'Front Shoulders (Anterior Deltoid)',
    },
    {
      Exercise_id: '12',
      Exercise_name: 'Arnold Press',
      Exercise_image: 'arnold_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Shoulders',
      Primary_muscle: 'Front Shoulders (Anterior Deltoid)',
    },
    {
      Exercise_id: '13',
      Exercise_name: 'Dumbbell Shoulder Lateral Raise',
      Exercise_image: 'dumbbell_lateral_raise.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Shoulders',
      Primary_muscle: 'Side Shoulders (Lateral Deltoid)',
    },
    {
      Exercise_id: '14',
      Exercise_name: 'Cable Shoulder Lateral Raise',
      Exercise_image: 'cable_lateral_raise.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Shoulders',
      Primary_muscle: 'Side Shoulders (Lateral Deltoid)',
    },
    {
      Exercise_id: '15',
      Exercise_name: 'Barbell Curl',
      Exercise_image: 'barbell_curl.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Arms',
      Primary_muscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '16',
      Exercise_name: 'Romanian Deadlift',
      Exercise_image: 'barbell_romanian_deadlift.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Hamstrings',
    },
    {
      Exercise_id: '17',
      Exercise_name: 'Incline Dumbbell Bench Press',
      Exercise_image: 'incline_dumbbell_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Upper Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '18',
      Exercise_name: 'Leg Press',
      Exercise_image: 'machine_leg_press.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '19',
      Exercise_name: 'Plank',
      Exercise_image: 'plank.png',
      Exercise_type: 'Bodyweight Timed',
      Muscle_group: 'Core',
      Primary_muscle: 'Abdominals (Rectus Abdominis)',
    },
    {
      Exercise_id: '20',
      Exercise_name: 'Pull Ups',
      Exercise_image: 'pullup.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Lats (Latissimus Dorsi)',
    },
    {
      Exercise_id: '21',
      Exercise_name: 'Push Ups',
      Exercise_image: 'pushup.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Mid Chest (Pectoralis Major)',
    },
    {
      Exercise_id: '22',
      Exercise_name: 'Seated Cable Row',
      Exercise_image: 'seated_cable_row.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '23',
      Exercise_name: 'Triceps Pushdown',
      Exercise_image: 'triceps_pushdown.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Arms',
      Primary_muscle: 'Triceps (Triceps Brachii)',
    },
    {
      Exercise_id: '24',
      Exercise_name: 'Bent Over Barbell Row',
      Exercise_image: 'bent-over-row.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '25',
      Exercise_name: 'Close Grip Lat Pulldown',
      Exercise_image: 'close-grip-lat-pulldown.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '26',
      Exercise_name: 'Lat Pulldown',
      Exercise_image: 'lat-pulldown.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Upper Back (Trapezius)',
    },
    {
      Exercise_id: '27',
      Exercise_name: 'Reverse Grip Lat Pulldown',
      Exercise_image: 'reverse-grip-lat-pulldown.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '28',
      Exercise_name: 'Straight Arm Pulldown',
      Exercise_image: 'straight-arm-pulldown.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '29',
      Exercise_name: 'Single Arm Dumbbell Row',
      Exercise_image: 'single-arm-dumbbell-row.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '30',
      Exercise_name: 'Machine Rows',
      Exercise_image: 'machine-row.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Middle Back (Rhomboids)',
    },
    {
      Exercise_id: '31',
      Exercise_name: 'Machine Reverse Fly',
      Exercise_image: 'machine-reverse-fly.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Rear Shoulders (Posterior Deltoid)',
    },
    {
      Exercise_id: '32',
      Exercise_name: 'Dumbbell Shrug',
      Exercise_image: 'dumbbell-shrug.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Back',
      Primary_muscle: 'Upper Back (Trapezius)',
    },
    {
      Exercise_id: '33',
      Exercise_name: 'Prechure Curl',
      Exercise_image: 'prechure_curl.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Arms',
      Primary_muscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '34',
      Exercise_name: 'Incline Dumbbell Curl',
      Exercise_image: 'incline_dumbbell_curl.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Arms',
      Primary_muscle: 'Biceps (Long Head)',
    },
    {
      Exercise_id: '35',
      Exercise_name: 'Hammer Curl',
      Exercise_image: 'hammer_curl.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Arms',
      Primary_muscle: 'Biceps (Brachialis)',
    },
    {
      Exercise_id: '36',
      Exercise_name: 'Dumbbell Curl',
      Exercise_image: 'dumbbell_curl.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Arms',
      Primary_muscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '37',
      Exercise_name: 'Cable Curl',
      Exercise_image: 'cable_curl.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Arms',
      Primary_muscle: 'Biceps (Short Head)',
    },
    {
      Exercise_id: '38',
      Exercise_name: 'Dumbbell Lunges',
      Exercise_image: 'dumbbell-lunge.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '39',
      Exercise_name: 'Dumbbell Lunges',
      Exercise_image: 'dumbbell-lunge.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '40',
      Exercise_name: 'Dumbbell Romanian Deadlift',
      Exercise_image: 'dumbbell-romanian-deadlift.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Hamstrings',
    },
    {
      Exercise_id: '41',
      Exercise_name: 'Goblet Squat',
      Exercise_image: 'goblet-squat.png',
      Exercise_type: 'Bodyweight Timed',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '42',
      Exercise_name: 'Leg Extension',
      Exercise_image: 'leg-extension.png',
      Exercise_type: 'Isolation Weight',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '43',
      Exercise_name: 'Leg Curl',
      Exercise_image: 'seated-leg-curl.png',
      Exercise_type: 'Isolation Weight',
      Muscle_group: 'Legs',
      Primary_muscle: 'Hamstrings',
    },
    {
      Exercise_id: '44',
      Exercise_name: 'Lying Leg Curl',
      Exercise_image: 'lying-leg-curl.png',
      Exercise_type: 'Isolation Weight',
      Muscle_group: 'Legs',
      Primary_muscle: 'Hamstrings',
    },
    {
      Exercise_id: '45',
      Exercise_name: 'Machine Standing Calf Raise',
      Exercise_image: 'machine-standing-calf-raise.png',
      Exercise_type: 'Isolation Weight',
      Muscle_group: 'Legs',
      Primary_muscle: 'Calves (Gastrocnemius)',
    },
    {
      Exercise_id: '46',
      Exercise_name: 'Seated Calf Raise',
      Exercise_image: 'seated-calf-raise.png',
      Exercise_type: 'Isolation Weight',
      Muscle_group: 'Legs',
      Primary_muscle: 'Calves (Soleus)',
    },
    {
      Exercise_id: '47',
      Exercise_name: 'Smith Maching Squats',
      Exercise_image: 'smith-machine-squat.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads (Quadriceps)',
    },
    {
      Exercise_id: '48',
      Exercise_name: 'Cable Overhead Tricep Extension',
      Exercise_image: 'cable-overhead-tricep-extension.png',
      Exercise_type: 'Isolation Weight',
      Muscle_group: 'Triceps',
      Primary_muscle: 'Triceps (Long Head)',
    },
    {
      Exercise_id: '49',
      Exercise_name: 'Single Arm Dumbbell Tricep Extension',
      Exercise_image: 'single_arm_dumbbell_extension.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Triceps',
      Primary_muscle: 'Triceps (Long Head)',
    },
    {
      Exercise_id: '50',
      Exercise_name: 'Triceps Rope Pushdown',
      Exercise_image: 'tricep_rope_pushdown.png',
      Exercise_type: 'Isolation Weight',
      Muscle_group: 'Triceps',
      Primary_muscle: 'Triceps (Lateral Head)',
    },
    {
      Exercise_id: '51',
      Exercise_name: 'Dumbbell Tricep Kickback',
      Exercise_image: 'dumbbell-tricep-kickback.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Triceps',
      Primary_muscle: 'Triceps (Lateral Head)',
    },
  ];

  constructor(
    private workoutService: WorkoutService,
    private popoverController: PopoverController,
    private toastController: ToastController,
  ) {}

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

  ngOnInit() {
    //fetching split data from db
    this.workoutService.getWorkoutSessions().subscribe({
      next: (data) => {
        this.workoutSessions = data;
        console.log('workoutSessions:', this.workoutSessions);

        this.groupedSessions = this.workoutSessions.map((session) => {
          const exerciseMap = new Map<string, { count: number }>();

          session.exerciseLogs.forEach((log) => {
            const id = log.exerciseId.toString();
            if (exerciseMap.has(id)) {
              exerciseMap.get(id)!.count += 1;
            } else {
              exerciseMap.set(id, { count: 1 });
            }
          });

          const exercises = Array.from(exerciseMap.entries()).map(
            ([id, data]) => {
              const exercise = this.exercises.find((e) => e.Exercise_id === id);
              return {
                Exercise_id: id,
                Exercise_name: exercise?.Exercise_name || 'Unknown',
                Exercise_image: exercise?.Exercise_image || '',
                numberOfSets: data.count.toString(),
              };
            }
          );

          let totalSets = session.exerciseLogs.length;
          var totalVolume = 0; 
          session.exerciseLogs.forEach((log: any) => {
            if (log.reps != null && log.weight != null) {
              totalVolume += log.reps * log.weight;
            }
          });
          return {
            sessionId: session.sessionId,
            exercises,
            totalVolume,
            totalSets
          };
        });
        console.log('Grouped Sessions:', this.groupedSessions);
      },
      error: (err) => {
        console.error('Error loading exercises:', err);
      },
    });
  }

  async handleDeleteClick(event: CustomEvent<OverlayEventDetail>, sessionId: number|undefined) {
      await this.popoverController.dismiss();
      console.log(`Dismissed with role: ${event.detail.role}, sessionId: ${sessionId}`);
      if(event.detail.role === 'confirm' && sessionId !== undefined) {
        this.workoutService.deleteWorkoutSession(sessionId).subscribe({
          next: async () => {
            console.log(`Deleted session with id: ${sessionId}`);
            const toast = await this.toastController.create({
              message: 'Session Deleted Successfully.',
              duration: 3000,
              color: 'success',
              position: 'bottom',
            });
            await toast.present();
            this.workoutSessions = this.workoutSessions.filter(
              (session) => session.sessionId !== sessionId
            );
            this.groupedSessions = this.groupedSessions.filter(
              (session) => session.sessionId !== sessionId
            );
          },
          error: (err) => {
            console.error('Error deleting session:', err);
          }
        });
      }
    }

}
