import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  items: taskListItems[];
  taskValue:string = '';
  
  constructor() { 
    this.items = [];
  }

  ngOnInit() {
  }

  addTask(newItem: string) {
    this.taskValue = null;
    this.items.push({
      text: newItem
    });   
  }

}

export class taskListItems {
  text: String;
}
