import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Output() openSideBar: EventEmitter<any> = new EventEmitter()

  private listRoutes = [
    {redirectTo: '/', text: 'Posts'},
    {redirectTo: '/', text: 'Post 1'},
  ]

  constructor() { }

  ngOnInit() {
  }

  sidebarOpen(e){
    this.openSideBar.emit(true)
  }

}
