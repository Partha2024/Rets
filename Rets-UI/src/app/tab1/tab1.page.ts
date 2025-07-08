import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  WorkoutService,
  workoutSession,
} from '../services/workoutSession.service';

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

  constructor(
    private workoutService: WorkoutService
  ) {}

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
                exerciseId: id,
                exerciseName: exercise?.Exercise_name || 'Unknown',
                exerciseImage: exercise?.Exercise_image || '',
                numberOfSets: data.count.toString(),
              };
            }
          );
          return {
            sessionId: session.sessionId,
            exercises,
          };
        });
        console.log('Grouped Sessions:', this.groupedSessions);
      },
      error: (err) => {
        console.error('Error loading exercises:', err);
      },
    });

    // //fetching last workout session data for the split
    // this.workoutService.getLastSessionBySplitId(13).subscribe({
    //   next: (session) => {
    //     console.log('lastWorkoutSession', session);
    //   },
    //   error: (err) => {
    //     console.error('Failed to fetch last session:', err);
    //   },
    // });
  }
}
