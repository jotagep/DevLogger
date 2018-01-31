import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

import { Log } from '../../models/log.interface';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  log: Log;

  isNew = true;

  constructor(
    private _log: LogService
  ) { }

  ngOnInit() {
    this._log.selectedLog.subscribe((log: Log) => {
      console.log(log);
      if (log.id !== null) {
        this.isNew = false;
      }
      this.log = log;
    });
  }

  onSubmit() {
    if (this.isNew) {
      this._log.addLog(this.log.text);
    } else {
      this.log.date = new Date();
      this._log.updateLog(this.log);
    }
    this.isNew = true;
  }

  clear() {
    this.isNew = true;
    this._log.clearState();
  }

}
