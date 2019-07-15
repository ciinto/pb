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

  constructor() {
    
  }

  ngOnInit() {
    console.log(this.displayColumn);
    this.list = this.service.list()

  }

  delete(element){
    console.log(element)
  }

}
