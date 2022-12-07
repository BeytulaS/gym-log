import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isPhone$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
