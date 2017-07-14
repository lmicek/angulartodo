import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  items: taskListItems[];
  orderNumber: number = 1;
  
  constructor() { 
    this.items = [];
  }

  ngOnInit() {
  }

  addTask(newItem: HTMLInputElement) {
    this.items.push({
      text: newItem.value,
      order: this.orderNumber++
    });
    newItem.value = null;    
  }

  deleteTask(deleteItem: taskListItems) {
    let index: number = this.items.indexOf(deleteItem);
    if (index !== -1) {
        this.items.splice(index, 1);
    }
    this.orderNumber = 1;
    for(var i=0;i<this.items.length;i++) {
      this.items[i].order = this.orderNumber++;
    }
  }

} //end of TaskListComponent

export class taskListItems {
  text: string;
  order: number;
}
