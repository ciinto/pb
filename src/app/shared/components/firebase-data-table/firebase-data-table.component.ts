import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ServiceInterface } from 'src/app/core/interfaces/service.interface';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-firebase-data-table',
  templateUrl: './firebase-data-table.component.html',
  styleUrls: ['./firebase-data-table.component.scss']
})
export class FirebaseDataTableComponent implements OnInit, OnChanges {
  @Input() model
  @Input() service: ServiceInterface
  @Input() detailLink: string
  @Input() start
  @Input() end

  list
  displayColumns
  lastCreatedAt
  firstCreatedAt

  paginator$ = new BehaviorSubject<string | null>(null)
  start$ = new BehaviorSubject<string | null>(null)
  end$ = new BehaviorSubject<string | null>(null)
  queryObservable

  constructor() {

  }

  ngOnInit() {
    this.displayColumns = new this.model().displayColumns || []

    this.queryObservable = combineLatest(this.start$, this.end$).pipe(
      switchMap(([start, end]) => {
        console.log(start, end);

        if (start || end) {
          return this.service.list(start, end)
        } else {
          return this.service.list()
        }
      })
    ).subscribe(value => {
      console.log(value);
      this.firstCreatedAt = value[0] ? value[0].createdAt : null
      this.lastCreatedAt = value[value.length - 1] ? value[value.length - 1].createdAt : null
      this.list = value.map(e => {
        return new this.model(e)
      })
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.start) {
      this.start$.next(changes.start.currentValue)
    }

    if (changes.end) {
      this.end$.next(changes.end.currentValue)
    }
  }

  delete(id) {
    return this.service.delete(id).subscribe()
  }

}
