import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public keysHistory: string[] = [];
  constructor() {}

  public organizeHistory(key: string): void {
    if (this.keysHistory.includes(key)) {
      this.keysHistory = this.keysHistory.filter((oldKey) => oldKey !== key);
    }
    this.keysHistory.unshift(key);
    this.keysHistory = this.keysHistory.splice(0, 5);
    this.saveHistoryInLocalStorage();
  }

  public loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this.keysHistory = JSON.parse(localStorage.getItem('history')!);
  }

  public cleanHistory(): void {
    localStorage.setItem('history', JSON.stringify([]));
  }

  public deleteKeyFromHistory(key: string): void {
    if (this.keysHistory.includes(key)) {
      this.keysHistory = this.keysHistory.filter((oldKey) => oldKey !== key);
    }
    this.keysHistory = this.keysHistory.splice(0, 5);
    this.saveHistoryInLocalStorage();
  }

  private saveHistoryInLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.keysHistory));
  }
}
