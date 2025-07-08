import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SplitService } from '../services/split.service';
import {
  WorkoutService,
  lastWorkoutSession,
} from '../services/workoutSession.service';

@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.page.html',
  styleUrls: ['./start-workout.page.scss'],
  standalone: false,
})
export class StartWorkoutPage implements OnInit {
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

  groupedSessions: any[] = [];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private splitService: SplitService,
    private toastController: ToastController,
    private workoutService: WorkoutService
  ) {}

  exercises = [
    {
      Exercise_id: '1',
      Exercise_name: 'Push Ups',
      Exercise_image: 'pushup.png',
      Exercise_type: 'Bodyweight Reps',
      Muscle_group: 'Chest',
      Primary_muscle: 'Chest',
    },
    {
      Exercise_id: '2',
      Exercise_name: 'Squats',
      Exercise_image: 'squats.png',
      Exercise_type: 'Weighted Reps',
      Muscle_group: 'Legs',
      Primary_muscle: 'Quads',
    },
    {
      Exercise_id: '3',
      Exercise_name: 'Plank',
      Exercise_image: 'plank.png',
      Exercise_type: 'Bodyweight Timed',
      Muscle_group: 'Core',
      Primary_muscle: 'Core',
    },
  ];

  splitId!: number;
  splitName: string = '';
  selectedExerciseIds: Set<string> = new Set();
  defaultDay!: string;
  lastWorkoutSession?: lastWorkoutSession;

  ngOnInit() {
    //fetching split id from query params
    this.route.queryParams.subscribe((params) => {
      this.splitId = params['split_id'];
      if (this.splitId) {
        console.log('Split ID from query param:', this.splitId);
        //fetching split data from db using split id
        this.splitService.getSplit(this.splitId).subscribe({
          next: (data) => {
            this.splitName = data.splitName;
            this.selectedExerciseIds = new Set(data.exerciseIds);
            this.defaultDay = data.defaultDay;
            this.selectedExerciseIds.forEach((exId) => {
              this.setInputs[exId] = [
                { weight: undefined, reps: undefined, time: undefined },
                { weight: undefined, reps: undefined, time: undefined },
                { weight: undefined, reps: undefined, time: undefined },
              ]; // default 3 sets
            });
            console.log('Loaded Split:', data);
          },
          error: (err) => {
            console.error('Error loading Split:', err);
          },
        });

        //fetching last workout session data for the split
        this.workoutService.getLastSessionBySplitId(this.splitId).subscribe({
          next: (session) => {
            this.lastWorkoutSession = session;
            console.log('lastWorkoutSession', session);
            const exerciseMap = new Map<string,{ exerciseId: string; setData: any[] }>();
            session.exerciseLogs.forEach((log) => {
              const id = log.exerciseId;
              const existing = exerciseMap.get(id);
              const setData = {
                weight: log.weight ?? undefined,
                reps: log.reps ?? undefined,
                time: log.timeInSeconds ?? undefined,
              };
              if (existing) {
                existing.setData.push(setData);
              } else {
                exerciseMap.set(id, {
                  exerciseId: id,
                  setData: [setData],
                });
              }
            });
            this.groupedSessions = Array.from(exerciseMap.values());
            console.log('grouped ', this.groupedSessions);

            this.groupedSessions.forEach((exId) => {
              this.lastSessionData[exId.exerciseId] = exId.setData.map((set: any) => ({
                weight: set.weight,
                reps: set.reps,
                time: set.time,
              }));
            });
            console.log('Last Session Data:', this.lastSessionData, typeof this.lastSessionData);
          },
          error: (err) => {
            console.error('Failed to fetch last session:', err);
          },
        });
      }
    });
  }

  get selectedExercises() {
    return this.exercises.filter((ex) =>
      this.selectedExerciseIds.has(ex.Exercise_id)
    );
  }

  goBack() {
    this.navCtrl.back();
  }

  convertTimeToSeconds(timeStr: string): number {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
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
          // TimeInSeconds: set.time ? this.convertTimeToSeconds(set.time) : null
        };
        logs.push(log);
      });
    });

    let repsNull = false;
    logs.every((log) => {
      if (log.Reps != null || log.Weight != null) {
        repsNull = true;
        return;
      }
    });
    if (!repsNull) {
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
      console.log('Workout Payload:', workoutPayload);
      this.workoutService.createWorkoutSession(workoutPayload).subscribe({
        next: (response) => {
          console.log('Workout saved:', response);
          this.navCtrl.back();
        },
        error: (err) => {
          console.error('Error saving workout:', err);
        },
      });
    }
  }
}
