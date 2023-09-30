import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertComponent>) { }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }
  proceed(){
    this.dialogRef.close(true)
  }
}
