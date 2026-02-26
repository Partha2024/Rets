import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { exercises } from '../../data/exercises.data';

@Component({
  selector: 'app-replace-exercise',
  templateUrl: './replace-exercise.component.html',
  standalone: false,
  styleUrls: ['./replace-exercise.scss']
})

export class ReplaceExerciseModal {

  exercises = exercises;

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
    return this.exercises.filter(e => e.exerciseName.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  removeExerciseById(idToRemove: string | undefined) {
    this.exercises = this.exercises.filter(ex => ex.exerciseId !== idToRemove);
    // console.log('Exercises after removal:', this.exercises);
  }
}