import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

import { Log } from '../../models/log.interface';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  loaded = false;
  selectedLog: Log;

  constructor(
    private _log: LogService
  ) { }

  ngOnInit() {
    this._log.selectedLog.subscribe((log: Log) => {
      this.selectedLog = log;
    });
    this._log.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log) {
    this._log.setLog(log);
  }

  onDelete(log) {
    if (confirm('Are you sure?')) {
      this._log.deleteLog(log);
    }
  }
}
