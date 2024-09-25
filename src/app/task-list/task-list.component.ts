import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  items: taskListItems[];
  orderNumber: number = 1;
  isActive: boolean = false;
  isDisabled: boolean = true;

  constructor(private http: HttpClient) {
    this.items = []; 
  }

  ngOnInit() {
  }

  addTask(newItem: HTMLInputElement) {
    this.items.push({
      text: newItem.value,
      order: this.orderNumber++
    });
    newItem.value = '';   
    this.updateOrder(); 
  }

  addTaskItem(newItem: taskListItems) {
    this.items.push({
      text: newItem.text,
      order: (typeof newItem.order === 'number' ? newItem.order : 0) + 1
    });
    this.updateOrder(); 
  }

  deleteTask(deleteItem: taskListItems) {
    let index: number = this.items.indexOf(deleteItem);
    if (index !== -1) {
        this.items.splice(index, 1);
    }
    this.updateOrder();
  }

  keyDownFunction(event: KeyboardEvent, taskInput: HTMLInputElement) {
    if(event.code === 'Enter') {
      this.addTask(taskInput);
     }
  }

  moveItem(changeItem: taskListItems, direction: string) {
    let storeItem: taskListItems = changeItem;
    let index: number = this.items.indexOf(storeItem);
    this.deleteTask(changeItem);
    if(direction == 'up') {
      index--;
    }
    if(direction == 'down') {
      index++;
    }
    this.items.splice(index, 0, storeItem);
    this.updateOrder();
  }

  updateOrder() {
    if(typeof this.items !== 'undefined' && this.items.length > 0 && this.items!==null) {
      this.isActive = true;
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
      this.isActive = false;
    }
    this.orderNumber = 1;
    for(var i=0;i<this.items.length;i++) {
      this.items[i].order = this.orderNumber++;
    }
  }

  saveList(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/api/tasks', JSON.stringify(this.items), { headers: headers })
      .subscribe((res: any) => {
         console.log('inside postmehtod of sub.function', res.json());//only objects
      })
  }
}

export class taskListItems {
  text?: string;
  order?: number;
}