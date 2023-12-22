import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private routerEvent: Subscription = new Subscription();

  public title?: string;

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.setTitle();

    this.routerEvent = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        distinctUntilChanged()
      )
      .subscribe(() => this.setTitle());
  }

  ngOnDestroy(): void {
    this.routerEvent.unsubscribe();
  }

  private setTitle(): void {
    this.activatedRouter.children[0].data
      .pipe(map((data) => data['title']))
      .subscribe((title) => (this.title = title));
  }
}
