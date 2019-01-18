import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataGridPipes } from './utils/pipes/data-grid.pipes';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    MatProgressBarModule,
    FlexLayoutModule
  ],
  declarations: [
  DataGridComponent,
  DataGridPipes
  ],
  exports: [
  DataGridComponent,
  MatCheckboxModule,
  DataGridPipes,
  FlexLayoutModule
  ]
})
export class DataGridModule { }
