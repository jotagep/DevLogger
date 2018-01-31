import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/log.interface';



@Injectable()
export class LogService {

  logs: Log[];

  selectedLog =  new BehaviorSubject<Log>( {id: null, text: '', date: null} );

  constructor() {
    this.logs = [
      // {
      //   id: 2,
      //   text: 'Add fix',
      //   date: new Date()
      // },
      // {
      //   id: 1,
      //   text: 'Generate components',
      //   date: new Date()
      // },
    ];
  }

  getLogs (): Observable<Log[]> {
    return of(this.logs);
  }

  addLog(logText: string) {
    const log: Log = {
      id: this.logs.length > 0 ? this.logs[0].id + 1 : 1,
      text: logText,
      date: new Date()
    };
    this.logs.unshift(log);
    this.clearState();
  }

  updateLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });
    log.id = this.logs[0].id + 1;
    this.logs.unshift(log);
    this.clearState();
  }

  deleteLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });
    this.clearState();
  }

  setLog(log: Log) {
    this.selectedLog.next({...log});
  }

  clearState() {
    this.selectedLog.next({id: null, text: '', date: null} );
  }
}
