import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataGridPipes } from './utils/pipes/data-grid.pipes';

import {
  MatFormFieldModule,
  MatTableModule,
  MatSortModule, MatPaginatorModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';

import { DataGridComponent } from './data-grid.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
  DataGridComponent,
  DataGridPipes
  ],
  exports: [
  DataGridComponent,
  MatCheckboxModule,
  DataGridPipes
  ]
})
export class DataGridModule { }
