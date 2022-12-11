import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContributorsService } from '../../services/contributors/contributors.service';

@Component({
  selector: 'app-change-daily-deposit',
  templateUrl: './change-daily-deposit.component.html',
  styleUrls: ['./change-daily-deposit.component.scss']
})
export class ChangeDailyDepositComponent implements OnInit {
  form = new FormGroup({
    dailyDeposit: new FormControl(null, Validators.required)
  });
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangeDailyDepositComponent>,
    private constributorsService: ContributorsService
  ) { }

  ngOnInit(): void {
  }

  changeDailyDeposit() {
  }

  close() {
    this.dialogRef.close();
    return false;
  }

}
