import { Component, OnInit } from '@angular/core';
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/Rx';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

@Injectable()
export class TaskListComponent implements OnInit {
  items: taskListItems[];
  orderNumber: number = 1;
  isActive: boolean = false;
  isDisabled: boolean = true;
  
  constructor(private http: Http) { 
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
    this.updateOrder(); 
  }

  addTaskItem(newItem: taskListItems) {
    this.items.push({
      text: newItem.text,
      order: newItem.order++
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

  keyDownFunction(event,taskInput) {
    if(event.keyCode == 13) {
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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/api/tasks', JSON.stringify(this.items), {headers : headers})
      .subscribe(res => {
         console.log('inside postmehtod of sub.function', res.json());//only objects
      })
  }

} //end of TaskListComponent

export class taskListItems {
  text: string;
  order: number;
}
