import { Injectable, inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoadingDialogComponent } from '../../shared/components/';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private dialogs: MatDialog = inject(MatDialog);

  public successSnackBar(message: string = 'Proceso exitoso'): void {
    this.snackBar.open(message, 'Cerrar', {
      panelClass: ['success'],
    });
  }

  public errorSnakBar(
    message: string = 'Error',
    time: number | undefined = undefined
  ): void {
    const config = {
      panelClass: ['error'],
      duration: time,
    };
    const btnLabel: string = time ? '' : 'Cerrar';

    this.snackBar.open(message, btnLabel, config);
  }

  public loadingDialog(
    message: string = 'En procesos',
    disableClose: boolean = true
  ): MatDialogRef<LoadingDialogComponent> {
    return this.dialogs.open(LoadingDialogComponent, {
      data: message,
      disableClose,
    });
  }
}
