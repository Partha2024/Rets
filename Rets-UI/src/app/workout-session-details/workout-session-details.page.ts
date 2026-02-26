import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';
import {
  ExerciseLog,
  WorkoutService,
  workoutSession,
} from '../services/workoutSession.service';
import { exercises, Exercise } from '../data/exercises.data';

interface ExerciseSetView {
  setNumber: number;
  primary: string;
  secondary: string;
  volume: string;
}

interface ExerciseGroupView {
  exerciseId: string;
  exerciseName: string;
  exerciseImage: string;
  muscleGroup: string;
  primaryMuscle: string;
  exerciseType: string;
  totalSets: number;
  totalReps: number;
  totalVolume: number;
  bestWeight: number;
  sets: ExerciseSetView[];
  order: number;
}

interface TopSetView {
  exerciseName: string;
  weight: number;
  reps: number;
}

interface SummaryView {
  totalVolume: number;
  totalSets: number;
  totalReps: number;
  totalExercises: number;
  avgLoad: number;
  totalTimeSeconds: number;
  topSet?: TopSetView;
}

type MuscleRegion =
  | 'chest'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'core'
  | 'quads'
  | 'hamstrings'
  | 'calves'
  | 'back';

@Component({
  selector: 'app-workout-session-details',
  templateUrl: './workout-session-details.page.html',
  styleUrls: ['./workout-session-details.page.scss'],
  standalone: false,
  providers: [DatePipe],
})
export class WorkoutSessionDetailsPage implements OnInit {
  sessionId?: number;
  session?: workoutSession;
  exerciseGroups: ExerciseGroupView[] = [];
  muscleHeatmap: Record<MuscleRegion, number> = {
    chest: 0,
    shoulders: 0,
    biceps: 0,
    triceps: 0,
    forearms: 0,
    core: 0,
    quads: 0,
    hamstrings: 0,
    calves: 0,
    back: 0,
  };
  summary: SummaryView = {
    totalVolume: 0,
    totalSets: 0,
    totalReps: 0,
    totalExercises: 0,
    avgLoad: 0,
    totalTimeSeconds: 0,
  };
  dayLabel = '';
  isLoading = true;
  loadError = '';

  private exerciseLookup = new Map<string, Exercise>(
    exercises.map((exercise) => [exercise.exerciseId, exercise])
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private datePipe: DatePipe,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('sessionId');
    this.sessionId = paramId ? Number(paramId) : undefined;

    if (!this.sessionId || Number.isNaN(this.sessionId)) {
      this.isLoading = false;
      this.loadError = 'Invalid session id.';
      return;
    }

    this.loadSession(this.sessionId);
  }

  goBack() {
    this.router.navigateByUrl('/tabs/homepage');
  }

  private loadSession(sessionId: number) {
    this.isLoading = true;
    this.workoutService.getWorkoutSessions().subscribe({
      next: (sessions) => {
        const session = sessions.find((item) => item.sessionId === sessionId);
        if (!session) {
          this.loadError = 'Session not found.';
          this.session = undefined;
          return;
        }

        this.session = session;
        this.buildViewModel(session);
      },
      error: async () => {
        this.loadError = 'Unable to load this session right now.';
        this.session = undefined;

        const toast = await this.toastController.create({
          message: 'Unable to load workout details.',
          duration: 2500,
          color: 'danger',
          position: 'bottom',
        });
        await toast.present();
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private buildViewModel(session: workoutSession) {
    const groupMap = new Map<string, ExerciseGroupView>();
    let totalVolume = 0;
    let totalSets = 0;
    let totalReps = 0;
    let totalTimeSeconds = 0;
    let topSet: TopSetView | undefined;
    this.muscleHeatmap = {
      chest: 0,
      shoulders: 0,
      biceps: 0,
      triceps: 0,
      forearms: 0,
      core: 0,
      quads: 0,
      hamstrings: 0,
      calves: 0,
      back: 0,
    };

    session.exerciseLogs.forEach((log: ExerciseLog, index: number) => {
      const exerciseId = log.exerciseId?.toString() || 'unknown';
      const exerciseInfo = this.exerciseLookup.get(exerciseId);

      if (!groupMap.has(exerciseId)) {
        groupMap.set(exerciseId, {
          exerciseId,
          exerciseName:
            exerciseInfo?.exerciseName || log.exerciseName || 'Unknown Exercise',
          exerciseImage: exerciseInfo?.exerciseImage || '',
          muscleGroup: exerciseInfo?.muscleGroup || '',
          primaryMuscle: exerciseInfo?.primaryMuscle || '',
          exerciseType: exerciseInfo?.exerciseType || '',
          totalSets: 0,
          totalReps: 0,
          totalVolume: 0,
          bestWeight: 0,
          sets: [],
          order: index,
        });
      }

      const group = groupMap.get(exerciseId)!;
      const reps = log.reps ?? 0;
      const weight = log.weight ?? 0;
      const timeSeconds = log.timeInSeconds ?? 0;
      const hasWeight = weight > 0;
      const hasTimed = timeSeconds > 0;
      const volume = reps > 0 && hasWeight ? reps * weight : 0;
      const region = this.resolveMuscleRegion(
        exerciseInfo?.muscleGroup || '',
        exerciseInfo?.primaryMuscle || ''
      );

      group.totalSets += 1;
      group.totalReps += reps;
      group.totalVolume += volume;
      group.bestWeight = Math.max(group.bestWeight, weight);

      totalSets += 1;
      totalReps += reps;
      totalVolume += volume;
      totalTimeSeconds += timeSeconds;
      if (region) {
        this.muscleHeatmap[region] += 1;
      }

      if (hasWeight && reps > 0) {
        if (!topSet || weight > topSet.weight) {
          topSet = {
            exerciseName: group.exerciseName,
            weight,
            reps,
          };
        }
      }

      const primary = hasTimed ? this.formatDuration(timeSeconds) : `${reps} reps`;
      const secondary = hasTimed ? 'Timed' : hasWeight ? `${weight} kg` : 'Bodyweight';
      const volumeLabel = volume > 0 ? `${Math.round(volume)} kg` : '-';

      group.sets.push({
        setNumber: log.setNumber,
        primary,
        secondary,
        volume: volumeLabel,
      });
    });

    groupMap.forEach((group) => {
      group.sets.sort((a, b) => a.setNumber - b.setNumber);
    });

    this.exerciseGroups = Array.from(groupMap.values()).sort(
      (a, b) => a.order - b.order
    );

    this.summary = {
      totalVolume,
      totalSets,
      totalReps,
      totalExercises: this.exerciseGroups.length,
      avgLoad: totalReps > 0 ? totalVolume / totalReps : 0,
      totalTimeSeconds,
      topSet,
    };

    this.dayLabel = this.datePipe.transform(session.startTime, 'EEEE') || '';
  }

  private resolveMuscleRegion(muscleGroup: string, primaryMuscle: string): MuscleRegion | null {
    const group = muscleGroup.toLowerCase();
    const primary = primaryMuscle.toLowerCase();

    const fromGroup = this.mapMuscleText(group);
    if (fromGroup) {
      return fromGroup;
    }

    return this.mapMuscleText(primary);
  }

  private mapMuscleText(value: string): MuscleRegion | null {
    if (!value) {
      return null;
    }
    if (value.includes('chest') || value.includes('pectoral')) {
      return 'chest';
    }
    if (value.includes('back') || value.includes('lat') || value.includes('rhomboid') || value.includes('trapezius')) {
      return 'back';
    }
    if (value.includes('shoulder') || value.includes('deltoid')) {
      return 'shoulders';
    }
    if (value.includes('forearm')) {
      return 'forearms';
    }
    if (value.includes('bicep')) {
      return 'biceps';
    }
    if (value.includes('tricep')) {
      return 'triceps';
    }
    if (value.includes('arm')) {
      return 'biceps';
    }
    if (value.includes('core') || value.includes('ab')) {
      return 'core';
    }
    if (value.includes('quad')) {
      return 'quads';
    }
    if (value.includes('hamstring')) {
      return 'hamstrings';
    }
    if (value.includes('calf')) {
      return 'calves';
    }
    if (value.includes('leg')) {
      return 'quads';
    }
    return null;
  }

  formatDuration(totalSeconds: number) {
    if (!totalSeconds || totalSeconds <= 0) {
      return '0s';
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }

    return `${seconds}s`;
  }
}
