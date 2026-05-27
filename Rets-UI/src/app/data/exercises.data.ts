export interface Exercise {
  exerciseId: string;
  exerciseName: string;
  exerciseImage: string;
  exerciseType: string;
  muscleGroup: string;
  primaryMuscle: string;
  weightCalculationType: string;
}

export const exercises: Exercise[] = [
  {
    exerciseId: '1',
    exerciseName: 'Barbell Back Squat',
    exerciseImage: 'barbell-squat.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '2',
    exerciseName: 'Deadlift',
    exerciseImage: 'deadlift.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Other',
    primaryMuscle: 'Hamstrings',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '3',
    exerciseName: 'Bench Press',
    exerciseImage: 'barbell-bench-press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Mid Chest (Pectoralis Major)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '4',
    exerciseName: 'Dumbbell Bench Press',
    exerciseImage: 'dumbbell_bench_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Mid Chest (Pectoralis Major)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '5',
    exerciseName: 'Incline Bench Press',
    exerciseImage: 'incline_bench_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Upper Chest (Pectoralis Major)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '6',
    exerciseName: 'Incline Dumbbell Bench Press',
    exerciseImage: 'incline_dumbbell_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Upper Chest (Pectoralis Major)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '7',
    exerciseName: 'Decline Bench Press',
    exerciseImage: 'decline_bench_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Lower Chest (Pectoralis Major)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '8',
    exerciseName: 'Decline Dumbbell Bench Press',
    exerciseImage: 'decline_dumbbell_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Lower Chest (Pectoralis Major)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '9',
    exerciseName: 'Pec Deck',
    exerciseImage: 'pec_dec.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Mid Chest (Pectoralis Major)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '10',
    exerciseName: 'Lower Chest Cable Press',
    exerciseImage: 'lower_chest_cable_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Lower Chest (Pectoralis Major)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '11',
    exerciseName: 'Dumbbell Overhead Shoulder Press',
    exerciseImage: 'dumbbell_shoulder_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Shoulders',
    primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '12',
    exerciseName: 'Arnold Press',
    exerciseImage: 'arnold_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Shoulders',
    primaryMuscle: 'Front Shoulders (Anterior Deltoid)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '13',
    exerciseName: 'Dumbbell Shoulder Lateral Raise',
    exerciseImage: 'dumbbell_lateral_raise.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Shoulders',
    primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '14',
    exerciseName: 'Cable Shoulder Lateral Raise',
    exerciseImage: 'cable_lateral_raise.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Shoulders',
    primaryMuscle: 'Side Shoulders (Lateral Deltoid)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '15',
    exerciseName: 'Barbell Curl',
    exerciseImage: 'barbell_curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Biceps (Short Head)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '16',
    exerciseName: 'Romanian Deadlift',
    exerciseImage: 'barbell_romanian_deadlift.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Hamstrings',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '17',
    exerciseName: 'Incline Dumbbell Bench Press',
    exerciseImage: 'incline_dumbbell_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Upper Chest (Pectoralis Major)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '18',
    exerciseName: 'Leg Press',
    exerciseImage: 'machine_leg_press.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '19',
    exerciseName: 'Plank',
    exerciseImage: 'plank.png',
    exerciseType: 'Bodyweight Timed',
    muscleGroup: 'Core',
    primaryMuscle: 'Abdominals (Rectus Abdominis)',
    weightCalculationType: 'TIME_HOLD'
  },
  {
    exerciseId: '20',
    exerciseName: 'Pull Ups',
    exerciseImage: 'pullup.png',
    exerciseType: 'Bodyweight Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Lats (Latissimus Dorsi)',
    weightCalculationType: 'REPS_ONLY'
  },
  {
    exerciseId: '21',
    exerciseName: 'Push Ups',
    exerciseImage: 'pushup.png',
    exerciseType: 'Bodyweight Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Mid Chest (Pectoralis Major)',
    weightCalculationType: 'REPS_ONLY'
  },
  {
    exerciseId: '22',
    exerciseName: 'Seated Cable Row',
    exerciseImage: 'seated_cable_row.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '23',
    exerciseName: 'Triceps Pushdown',
    exerciseImage: 'triceps_pushdown.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Triceps (Triceps Brachii)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '24',
    exerciseName: 'Bent Over Barbell Row',
    exerciseImage: 'bent-over-row.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '25',
    exerciseName: 'Close Grip Lat Pulldown',
    exerciseImage: 'close-grip-lat-pulldown.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '26',
    exerciseName: 'Lat Pulldown',
    exerciseImage: 'lat-pulldown.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Upper Back (Trapezius)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '27',
    exerciseName: 'Reverse Grip Lat Pulldown',
    exerciseImage: 'reverse-grip-lat-pulldown.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '28',
    exerciseName: 'Straight Arm Pulldown',
    exerciseImage: 'straight-arm-pulldown.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '29',
    exerciseName: 'Single Arm Dumbbell Row',
    exerciseImage: 'single-arm-dumbbell-row.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '30',
    exerciseName: 'Machine Rows',
    exerciseImage: 'machine-row.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '31',
    exerciseName: 'Machine Reverse Fly',
    exerciseImage: 'machine-reverse-fly.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Rear Shoulders (Posterior Deltoid)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '32',
    exerciseName: 'Dumbbell Shrug',
    exerciseImage: 'dumbbell-shrug.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Upper Back (Trapezius)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '33',
    exerciseName: 'Prechure Curl',
    exerciseImage: 'prechure_curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Biceps (Short Head)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '34',
    exerciseName: 'Incline Dumbbell Curl',
    exerciseImage: 'incline_dumbbell_curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Biceps (Long Head)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '35',
    exerciseName: 'Hammer Curl',
    exerciseImage: 'hammer_curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Biceps (Brachialis)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '36',
    exerciseName: 'Dumbbell Curl',
    exerciseImage: 'dumbbell_curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Biceps (Short Head)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '37',
    exerciseName: 'Cable Curl',
    exerciseImage: 'cable_curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Biceps (Short Head)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '38',
    exerciseName: 'Dumbbell Lunges',
    exerciseImage: 'dumbbell-lunge.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '39',
    exerciseName: 'Dumbbell Lunges',
    exerciseImage: 'dumbbell-lunge.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '40',
    exerciseName: 'Dumbbell Romanian Deadlift',
    exerciseImage: 'dumbbell-romanian-deadlift.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Hamstrings',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '41',
    exerciseName: 'Goblet Squat',
    exerciseImage: 'goblet-squat.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '42',
    exerciseName: 'Leg Extension',
    exerciseImage: 'leg-extension.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '43',
    exerciseName: 'Leg Curl',
    exerciseImage: 'seated-leg-curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Hamstrings',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '44',
    exerciseName: 'Lying Leg Curl',
    exerciseImage: 'lying-leg-curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Hamstrings',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '45',
    exerciseName: 'Machine Standing Calf Raise',
    exerciseImage: 'machine-standing-calf-raise.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Calves (Gastrocnemius)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '46',
    exerciseName: 'Seated Calf Raise',
    exerciseImage: 'seated-calf-raise.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Calves (Soleus)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '47',
    exerciseName: 'Smith Machine Squats',
    exerciseImage: 'smith-machine-squat.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '48',
    exerciseName: 'Cable Overhead Tricep Extension',
    exerciseImage: 'cable-overhead-tricep-extension.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Triceps',
    primaryMuscle: 'Triceps (Long Head)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '49',
    exerciseName: 'Single Arm Dumbbell Tricep Extension',
    exerciseImage: 'single_arm_dumbbell_extension.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Triceps',
    primaryMuscle: 'Triceps (Long Head)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '50',
    exerciseName: 'Triceps Rope Pushdown',
    exerciseImage: 'tricep_rope_pushdown.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Triceps',
    primaryMuscle: 'Triceps (Lateral Head)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '51',
    exerciseName: 'Dumbbell Tricep Kickback',
    exerciseImage: 'dumbbell-tricep-kickback.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Triceps',
    primaryMuscle: 'Triceps (Lateral Head)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '52',
    exerciseName: 'Incline Chest Press Machine',
    exerciseImage: 'incline-chest-press-machine.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Chest',
    primaryMuscle: 'Pectorals (Middle)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '53',
    exerciseName: 'Wide Grip Lat Pulldown Machine',
    exerciseImage: 'wide-grip-lat-pulldown-machine.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Latissimus Dorsi',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '54',
    exerciseName: 'Biceps Curl Machine',
    exerciseImage: 'biceps-curl-machine.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Biceps',
    primaryMuscle: 'Biceps (Long Head)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '55',
    exerciseName: 'Shoulder press machine',
    exerciseImage: 'shoulder-press-machine.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Shoulders',
    primaryMuscle: 'Deltoids (Anterior)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '56',
    exerciseName: 'Lateral Raise Machine',
    exerciseImage: 'lateral-raise-machine.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Shoulders',
    primaryMuscle: 'Deltoids (Lateral)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '57',
    exerciseName: 'Cable Hammer Curl',
    exerciseImage: 'cable_hammer_curl.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Arms',
    primaryMuscle: 'Biceps (Brachialis)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '58',
    exerciseName: 'Single Arm Cable Row',
    exerciseImage: 'single_arm_cable_row.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Middle Back (Rhomboids)',
    weightCalculationType: 'MACHINE_STACK'
  },
  {
    exerciseId: '59',
    exerciseName: 'Machine Hack Squat',
    exerciseImage: 'machine_hack_squat.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_SIDE_BARBELL'
  },
  {
    exerciseId: '60',
    exerciseName: 'Dumbbell Split Squat',
    exerciseImage: 'dumbbell-split-squat.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Legs',
    primaryMuscle: 'Quads (Quadriceps)',
    weightCalculationType: 'PER_HAND_DUMBBELL'
  },
  {
    exerciseId: '61',
    exerciseName: 'Face Pulls',
    exerciseImage: 'face_pulls.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Back',
    primaryMuscle: 'Rear Shoulders (Posterior Deltoid)',
    weightCalculationType: 'MACHINE_STACK'
  },
  { 
    exerciseId: '62',
    exerciseName: 'Cable Tricep Kickback',
    exerciseImage: 'dumbbell-tricep-kickback.png',
    exerciseType: 'Weighted Reps',
    muscleGroup: 'Triceps',
    primaryMuscle: 'Triceps (Lateral Head)',
    weightCalculationType: 'MACHINE_STACK'
  },
];
