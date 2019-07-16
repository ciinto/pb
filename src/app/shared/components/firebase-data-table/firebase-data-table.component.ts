import { Component, OnInit, Input } from '@angular/core';
import { ServiceInterface } from 'src/app/core/interfaces/service.interface';

@Component({
  selector: 'app-firebase-data-table',
  templateUrl: './firebase-data-table.component.html',
  styleUrls: ['./firebase-data-table.component.scss']
})
export class FirebaseDataTableComponent implements OnInit {
  @Input() service: ServiceInterface
  @Input() displayColumn: string[]
  @Input() detailLink: string

  list
  columnToDisplay

  constructor() {

  }

  ngOnInit() {
    this.list = this.service.list()
  }

  delete(id) {
    return this.service.delete(id).subscribe()
  }

}
