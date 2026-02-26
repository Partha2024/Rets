import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService, workoutSession } from '../services/workoutSession.service';
import { OverlayEventDetail } from '@ionic/core';
import { PopoverController, ToastController, RefresherCustomEvent, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { exercises } from '../data/exercises.data';

interface DisplaySession {
  sessionId: number | undefined;
  splitName: string;
  startTime: string;
  totalVolume: number;
  totalSets: number;
  exercises: any[];
  day: string; // Derived from startTime
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: false,
  providers: [DatePipe]
})
export class HomePagePage implements OnInit {
  splitName?: string;
  workoutSessions: workoutSession[] = [];
  // groupedSessions: any[] = []; // Replaced by displaySessions
  allSessions: DisplaySession[] = []; // Master copy
  displaySessions: DisplaySession[] = []; // Filtered/Sorted copy
  
  isRefreshing: boolean = false;
  isLoading: boolean = true;

  // Filter & Sort State
  sortBy: 'date-desc' | 'date-asc' = 'date-desc';
  filterType: 'all' | 'split' | 'day' = 'all';
  selectedSplitFilter: string = '';
  selectedDayFilter: string = '';
  
  availableSplits: string[] = [];
  availableDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  exercises = exercises;

  constructor(
    private workoutService: WorkoutService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private menu: MenuController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    //fetching split data from db
    this.workoutService.getWorkoutSessions().subscribe({
      next: (data) => {
        this.workoutSessions = data;
        this.isLoading = false;
        console.log('Exercise Logs:', this.workoutSessions);

        this.processSessions();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading exercises:', err);
      },
    });
  }

  processSessions() {
     this.allSessions = this.workoutSessions.map((session) => {
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
              const exercise = this.exercises.find((e) => e.exerciseId === id);
              return {
                exerciseId: id,
                exerciseName: exercise?.exerciseName || 'Unknown',
                exerciseImage: exercise?.exerciseImage || '',
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
            splitName: session.split.splitName,
            startTime: session.startTime,
            totalVolume,
            totalSets,
            exercises,
            day: this.datePipe.transform(session.startTime, 'EEEE') || ''
          };
        });
        
        // Extract available options for filters
        this.availableSplits = [...new Set(this.allSessions.map(s => s.splitName))].sort();
        
        this.applySortAndFilter();
        console.log('Processed Sessions:', this.allSessions);
  }

  onSortChange(event: any) {
    this.sortBy = event.detail.value;
    this.applySortAndFilter();
  }

  applyFilter(type: 'all' | 'split' | 'day', value: string = '') {
    this.filterType = type;
    if (type === 'split') {
        this.selectedSplitFilter = value;
        this.selectedDayFilter = ''; // Reset others
    } else if (type === 'day') {
        this.selectedDayFilter = value;
        this.selectedSplitFilter = ''; // Reset others
    } else {
        this.selectedSplitFilter = '';
        this.selectedDayFilter = '';
    }
    this.applySortAndFilter();
    this.menu.close(); // Close menu after selection
  }

  applySortAndFilter() {
      let tempSessions = [...this.allSessions];

      // 1. Filter
      if (this.filterType === 'split' && this.selectedSplitFilter) {
          tempSessions = tempSessions.filter(s => s.splitName === this.selectedSplitFilter);
      } else if (this.filterType === 'day' && this.selectedDayFilter) {
          tempSessions = tempSessions.filter(s => s.day === this.selectedDayFilter);
      }

      // 2. Sort
      tempSessions.sort((a, b) => {
          const dateA = new Date(a.startTime).getTime();
          const dateB = new Date(b.startTime).getTime();
          return this.sortBy === 'date-desc' ? dateB - dateA : dateA - dateB;
      });

      this.displaySessions = tempSessions;
  }


  getActionSheetButtons() {
    return [
      {
        text: 'Delete Split',
        role: 'destructive',
        icon: 'trash-outline',
        data: { action: 'delete' },
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

  editActionHandler(event: CustomEvent<OverlayEventDetail>, sessionId: number | undefined) {
    if (event.detail.role === 'destructive') {
      console.log('Delete Session Clicked');
      this.presentDeleteAlert(event, sessionId);
    }
  }

  async presentDeleteAlert(event: CustomEvent<OverlayEventDetail>, sessionId: number | undefined) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.handleDeleteClick(event, sessionId);
          },
        },
      ],
    });
    await alert.present();
  }

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

  async handleDeleteClick(event: CustomEvent<OverlayEventDetail>, sessionId: number | undefined) {
    const loading = await this.loadingController.create({
      message: 'Deleting Session',
      spinner: 'crescent'
    });
    await loading.present();
    console.log(`Dismissed with role: ${event.detail.role}, sessionId: ${sessionId}`);
    if (event.detail.role === 'destructive' && sessionId !== undefined) {
      this.workoutService.deleteWorkoutSession(sessionId).subscribe({
        next: async () => {
          console.log(`Deleted session with id: ${sessionId}`);
          const toast = await this.toastController.create({
            message: 'Session Deleted Successfully.',
            duration: 3000,
            color: 'success',
            position: 'bottom',
            swipeGesture: 'vertical'
          });
          await toast.present();
          setTimeout(() => {
            window.location.reload();
          },200)
        },
        error: (err) => {
          console.error('Error deleting session:', err);
        },
        complete: async () => {
          await loading.dismiss();
        }
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
}