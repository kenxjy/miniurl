import { Component, OnInit, Input } from '@angular/core';
import { MiniUrl } from 'libs/interfaces/miniUrl';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'miniurl-mini-url-list',
  templateUrl: './mini-url-list.component.html',
  styleUrls: ['./mini-url-list.component.scss']
})
export class MiniUrlListComponent implements OnInit {
  @Input() dataSource: MiniUrl[];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  getMiniURL(id: string) {
    return environment.baseURL + id;
  }

  copyURL(id: string) {
    navigator.clipboard.writeText(environment.baseURL + id).then(() => {
      this.snackBar.open('Copied to clipboard!', null, {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }
}
