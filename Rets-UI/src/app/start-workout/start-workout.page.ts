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
  LoadingController,
  AlertController,
  Platform,
  IonRouterOutlet,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SplitExercise, SplitService } from '../services/split.service';
import {
  WorkoutService,
  lastWorkoutSession,
} from '../services/workoutSession.service';
import { IonModal, ModalController } from '@ionic/angular';
import { ReplaceExerciseModal } from './components/replace-exercise.component';
import type { OverlayEventDetail } from '@ionic/core';

import { exercises, Exercise } from '../data/exercises.data';


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
      completed?: boolean;
    }[];
  } = {};

  lastSessionData: {
    [exerciseId: string]: {
      weight?: number;
      reps?: number;
      time?: string;
    }[];
  } = {};

  exercises: Exercise[] = exercises;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private splitService: SplitService,
    private toastController: ToastController,
    private workoutService: WorkoutService,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
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
  private backButtonSubscription?: Subscription;

  // Cached derived data to avoid getter recomputation
  selectedExercises: ExerciseWithOrder[] = [];

  getActionSheetButtons(exerciseId: string) {
    return [
      {
        text: 'Replace Exercise',
        role: 'replace',
        icon: 'sync-outline',
        handler: () => {
          // this.isModalOpen = true;
          this.openModal(exerciseId);
        },
        data: {
          action: 'replace',
        },
      },
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
            this.splitName = data.splitName;
            this.selectedExerciseIds = new Set(data.exerciseIds);
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

        this.workoutService.getLastSessionBySplitId(this.splitId).subscribe({
          next: (session) => {
            this.lastSessionData = (this.lastSessionData ?? {}) as Record<
              string,
              { weight: number; reps: number; time: string }[]
            >;
            this.groupedSessions = [];
            const emptySetsNum = 3;

            const makeEmptySets = (n = emptySetsNum) =>
              Array.from({ length: n }, () => ({
                weight: 0,
                reps: 0,
                time: '0',
              }));

            if (session == null) {
              // No previous session: seed groupedSessions from selectedExercises with 3 empty sets
              this.groupedSessions = (this.selectedExercises ?? []).map(
                (exercise: any) => ({
                  exerciseId: String(exercise.exerciseId),
                  setData: makeEmptySets(emptySetsNum),
                }),
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

              // 3) Fill lastSessionData from groupedSessions with numeric normalization
              this.groupedSessions.forEach((ex) => {
                this.lastSessionData[ex.exerciseId] = ex.setData.map(
                  (set: any) => ({
                    weight: Number(set.weight) || 0,
                    reps: Number(set.reps) || 0,
                    time: toStr(set.timeInSeconds) || '0',
                  }),
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
                this.groupedSessions.map((g) => g.exerciseId),
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
                  completed: false,
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

  ionViewDidEnter() {
    this.routerOutlet.swipeGesture = false;
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(9999, () => {
        this.goBack();
      });
  }

  ionViewWillLeave() {
    this.routerOutlet.swipeGesture = true;
    this.backButtonSubscription?.unsubscribe();
  }

  // Build selectedExercises once per relevant change
  private recomputeSelectedExercises(): void {
    const orderMap = new Map<string, number>();
    for (const e of this.selectedExerciseIds) {
      orderMap.set(e.exerciseId, e.sortOrder ?? 0);
    }

    this.selectedExercises = this.exercises
      .filter((ex) => orderMap.has(ex.exerciseId))
      .map((ex) => ({
        ...ex,
        sortOrder: orderMap.get(ex.exerciseId) ?? 0,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // trackBy for ngFor
  trackByExerciseId = (_: number, ex: Exercise) => ex.exerciseId;

  async openModal(exerciseId: string) {
    const modal = await this.modalCtrl.create({
      component: ReplaceExerciseModal,
      componentProps: { exerciseId },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      // data is the new exerciseId to replace with
      const exists = Array.from(this.selectedExerciseIds).some(
        (e) => e.exerciseId === data,
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
          (e) => e.exerciseId === exerciseId,
        );
        const preservedOrder = old?.sortOrder ?? 0;

        newSet.add({
          exerciseId: data,
          sortOrder: preservedOrder,
        });

        this.selectedExerciseIds = newSet;

        // Populate default sets for the new exercise if needed
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
    const loading = await this.loadingController.create({
      message: 'Saving Session',
      spinner: 'crescent',
    });
    await loading.present();

    this.selectedExercises.forEach((ex) => {
      const sets = this.setInputs[ex.exerciseId] || [];
      sets.forEach((set, index) => {
        const log = {
          ExerciseId: ex.exerciseId,
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
        (ex) => ex.exerciseId === log.ExerciseId,
      )?.exerciseType;

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
        swipeGesture: 'vertical',
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
            swipeGesture: 'vertical',
          });
          await toast.present();
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message:
              'Error Saving Session. [' +
              (err?.error?.message ?? 'Unknown error') +
              ']',
            duration: 3000,
            color: 'danger',
            position: 'bottom',
            swipeGesture: 'vertical',
          });
          await toast.present();
          await loading.dismiss();
        },
        complete: async () => {
          await loading.dismiss();
        },
      });
    }
  }

  async doRefresh(event: RefresherCustomEvent) {
    this.isRefreshing = true;
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.isRefreshing = false;
            event.target.complete();
          },
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            setTimeout(() => {
              window.location.reload();
              this.isRefreshing = false;
              event.target.complete();
            }, 500);
          },
        },
      ],
    });
    await alert.present();
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
    exerciseId: string,
  ) {
    if (event.detail.role === 'destructive') {
      const toDelete = Array.from(this.selectedExerciseIds).find(
        (e: any) => e.exerciseId === exerciseId,
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
      (e: any) => e.exerciseId === id,
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
    this.recomputeSelectedExercises();
    this.cdr.markForCheck();
  }

  isSelected(id: string): boolean {
    return Array.from(this.selectedExerciseIds).some(
      (e: any) => e.exerciseId === id,
    );
  }

  get filteredExercises() {
    const q = this.searchQuery.toLowerCase();
    return this.exercises
      .filter((e) => e.exerciseName.toLowerCase().includes(q))
      .sort((a, b) => {
        const aTime = this.selectionTimestamps.get(a.exerciseId);
        const bTime = this.selectionTimestamps.get(b.exerciseId);
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

  async goBack() {
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
      message: 'Do you really want to exit the workout session?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.back();
          },
        },
      ],
    });
    await alert.present();
  }

  convertTimeToSeconds(timeStr: string): number {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  checkSetCompletion(exerciseId: string, index: number, type: string) {
    setTimeout(() => {
      const set = this.setInputs[exerciseId][index];
      if (!set) return;

      let isCompleted = false;

      if (type === 'Weighted Reps') {
        const w = Number(set.weight);
        const r = Number(set.reps);
        isCompleted = w > 0 && r > 0;
      } else if (type === 'Bodyweight Reps') {
        const r = Number(set.reps);
        isCompleted = r > 0;
      } else if (type === 'Bodyweight Timed') {
        const t = Number(set.time);
        isCompleted = t > 0;
      }

      set.completed = isCompleted;
      this.cdr.detectChanges();
    }, 0);
  }
}
