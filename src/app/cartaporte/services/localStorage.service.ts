import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly maxHistoryShow: number = 5;
  private readonly localStorageKey: string = 'history';

  public keysHistory: string[] = [];

  public organizeHistory(key: string): void {
    this.removeKeyFromHistory(key);
    this.keysHistory.unshift(key);
    this.keysHistory = this.keysHistory.splice(0, this.maxHistoryShow);
    this.saveHistoryInLocalStorage();
  }

  public loadLocalStorage(): void {
    try {
      const storedHistory: string | null = localStorage.getItem(
        this.localStorageKey
      );
      storedHistory && (this.keysHistory = JSON.parse(storedHistory));
    } catch {
      console.error('Error loading from localStorage');
    }
  }

  public cleanHistory(): void {
    this.keysHistory = [];
    this.saveHistoryInLocalStorage();
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
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.keysHistory)
    );
  }
}
