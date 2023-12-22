import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private maxHistoryShow: number = 5;

  public keysHistory: string[] = [];

  constructor() {}

  public organizeHistory(key: string): void {
    this.removeKeyFromHistory(key);
    this.keysHistory.unshift(key);
    this.keysHistory = this.keysHistory.splice(0, this.maxHistoryShow);
    this.saveHistoryInLocalStorage();
  }

  public loadLocalStorage(): void {
    try {
      const storedHistory: string | null = localStorage.getItem('history');
      if (storedHistory) {
        this.keysHistory = JSON.parse(storedHistory);
      }
    } catch {
      console.error('Error loading from localStorage');
    }
  }

  public cleanHistory(): void {
    localStorage.setItem('history', JSON.stringify([]));
    this.loadLocalStorage();
  }

  public deleteKeyFromHistory(key: string): void {
    this.removeKeyFromHistory(key);
    this.keysHistory = this.keysHistory.splice(0, this.maxHistoryShow);
    this.saveHistoryInLocalStorage();
  }

  private removeKeyFromHistory(key: string) {
    if (this.keysHistory.includes(key)) {
      this.keysHistory = this.keysHistory.filter((oldKey) => oldKey !== key);
    }
  }

  private saveHistoryInLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.keysHistory));
  }
}
