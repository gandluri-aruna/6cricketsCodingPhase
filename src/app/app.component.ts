import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subject, takeUntil, tap } from 'rxjs';
import { CounterService } from './service/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  secondsLeft$ = new BehaviorSubject<number | null>(null);
  deadlineDate$ = new BehaviorSubject<Date | null>(null);

  private destroy$ = new Subject<void>();

  constructor(private deadlineService: CounterService) {}

  ngOnInit() {
    this.deadlineService.getDeadlines().pipe(
      tap(res => {
        const now = new Date();
        const deadline = new Date(now.getTime());
        this.deadlineDate$.next(deadline);
        this.secondsLeft$.next(res.secondsLeft);

        interval(1000).pipe(
          takeUntil(this.destroy$),
          tap(() => {
            const current = this.secondsLeft$.value;
            if (current !== null && current > 0) {
              this.secondsLeft$.next(current - 1);
            }
          })
        ).subscribe();
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  //cleanup the subscription when the component is destroyed
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
