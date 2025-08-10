import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-replace-exercise',
  templateUrl: './replace-exercise.component.html',
  standalone: false,
  styleUrls: ['./replace-exercise.scss']
})

export class ReplaceExerciseModal {

  exercises = [
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

  @Input() exerciseId?: string;

  name!: string;
  searchQuery = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log('Received exerciseId:', this.exerciseId, typeof this.exercises);
    this.removeExerciseById(this.exerciseId);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(exerciseId: string) {
    return this.modalCtrl.dismiss(exerciseId, 'confirm');
  }

  get filteredExercises() {
    return this.exercises.filter(e => e.Exercise_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  removeExerciseById(idToRemove: string | undefined) {
    this.exercises = this.exercises.filter(ex => ex.Exercise_id !== idToRemove);
    console.log('Exercises after removal:', this.exercises);
  }
}