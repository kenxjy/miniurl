import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MiniUrlService } from '../miniurl.service';

@Component({
  selector: 'miniurl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  recentMiniUrls$ = this.miniUrl.getRecentURLs();

  constructor(private miniUrl: MiniUrlService) {}
}
