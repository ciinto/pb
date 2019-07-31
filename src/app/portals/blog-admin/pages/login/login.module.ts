import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModuleModule } from 'src/app/shared/material-module/material-module.module';
import { AngularFireAuth } from '@angular/fire/auth';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModuleModule
  ],
  providers: [AngularFireAuth],
  exports: [LoginComponent]
})
export class LoginModule { }
