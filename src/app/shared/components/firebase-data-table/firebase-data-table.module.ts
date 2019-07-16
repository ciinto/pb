import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDataTableComponent } from './firebase-data-table.component';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FirebaseDataTableComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    RouterModule
  ],
  exports: [FirebaseDataTableComponent]
})
export class FirebaseDataTableModule { }
