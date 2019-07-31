import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoilaoiComponent } from './nguoilaoi.component';
import { SignalingService } from 'src/app/core/services/signaling.service';

@NgModule({
  declarations: [NguoilaoiComponent],
  imports: [
    CommonModule
  ],
  providers: [SignalingService],
  exports: [NguoilaoiComponent]
})
export class NguoilaoiModule { }
