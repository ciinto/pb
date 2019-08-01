import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SignalingService } from 'src/app/core/services/signaling.service';
import { Observable } from 'rxjs';
import { NguoilaoiUserInterface } from 'src/app/core/interfaces/nguoilaoi-user.interface';

@Component({
  selector: 'app-nguoilaoi',
  templateUrl: './nguoilaoi.component.html',
  styleUrls: ['./nguoilaoi.component.scss']
})
export class NguoilaoiComponent implements OnInit, OnDestroy {

  online = false
  myInfo: NguoilaoiUserInterface | {} = {}

  constructor(private signalingSevice: SignalingService) { }

  ngOnInit() {
    this.connect();
  }

  ngOnDestroy() {
    this.disconnect()
  }

  connect() {
    this.signalingSevice.online().subscribe(ref => {
      ref.subscribe(user => {
        if (user) {
          this.myInfo = user
        } else {
          this.myInfo = {}
        }
      })
      this.online = true
    })
  }

  leaveRoom() {
    this.signalingSevice.leaveRoom()
  }

  disconnect() {
    this.online && this.signalingSevice.offline().subscribe(ref => {
      console.log('disconnect')
      this.online = false
    })
  }

  findFriend() {
    this.signalingSevice.find$.next('normal')
  }

  @HostListener('window:beforeunload', ['$event'])
  canLeavePage($event: any) {
    console.log('reload', $event)
    this.disconnect()
    if (confirm('Leave?')) {
      return true
    }
  }

}
