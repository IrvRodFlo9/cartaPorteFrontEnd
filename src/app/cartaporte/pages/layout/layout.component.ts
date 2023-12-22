import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, distinctUntilChanged, filter, map } from 'rxjs';

import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  private routerEvent: Subscription = new Subscription();

  public lastKey?: string;
  public title?: string;

  get keyHistory(): string[] {
    return this.localStorageService.keysHistory;
  }

  constructor(
    private localStorageService: LocalStorageService,
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.setRouterEvents();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.routerEvent.unsubscribe();
  }

  public cleanHistory(): void {
    this.localStorageService.cleanHistory();
    this.router.navigateByUrl('list');
  }

  private setRouterEvents(): void {
    this.routerEvent = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        distinctUntilChanged()
      )
      .subscribe(() => this.setTitle());
  }

  private loadData(): void {
    this.localStorageService.loadLocalStorage();
  }

  private setTitle(): void {
    this.activatedRouter.children[0].data
      .pipe(map((data) => data['title']))
      .subscribe((title) => (this.title = title));
  }
}
