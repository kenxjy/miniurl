import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { isUri } from 'valid-url';
import { MiniUrlService } from '../miniurl.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'miniurl-mini-url-maker',
  templateUrl: './mini-url-maker.component.html',
  styleUrls: ['./mini-url-maker.component.scss']
})
export class MiniUrlMakerComponent implements OnInit, OnDestroy {
  urlToShorten: AbstractControl;
  pending$ = new BehaviorSubject(false);
  showCopyButton = false;

  subscriptions: Subscription[] = [];

  constructor(private miniUrl: MiniUrlService, private snackBar: MatSnackBar) {}

  isValidUrl: ValidatorFn = (control: FormControl) => {
    return isUri(control.value)
      ? null
      : {
          invalidUrl: true
        };
  };

  ngOnInit(): void {
    this.urlToShorten = new FormControl('', this.isValidUrl);

    const sub = this.urlToShorten.valueChanges
      .pipe(
        tap(() => {
          if (this.showCopyButton) {
            this.showCopyButton = false;
          }
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  shortenURL(url: string) {
    this.pending$.next(true);
    const sub = this.miniUrl.shortenURL(url).subscribe(res => {
      this.pending$.next(false);
      this.urlToShorten.setValue(environment.baseURL + res.id);
      this.showCopyButton = true;
    });
    this.subscriptions.push(sub);
  }

  copyURL() {
    navigator.clipboard
      .writeText(this.urlToShorten.value)
      .then(() =>
        this.snackBar.open('Copied to clipboard!', null, {
          duration: 2000,
          verticalPosition: 'top'
        })
      );
  }
}
