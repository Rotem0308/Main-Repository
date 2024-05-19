import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BannerService } from '../../core/services/banner.service';
import { Subscription, map } from 'rxjs';
import { IBanner } from '../../core/models/banner.model';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.scss',
})
export class ErrorBannerComponent implements OnInit, OnDestroy {
  constructor(private bannerService: BannerService) {}

  bannerSub!: Subscription;
  status: string = '';
  banner: IBanner | null = null;
  ngOnInit(): void {
    this.bannerSub = this.bannerService.banner$.subscribe({
      next: (resBanner) => {
        this.banner = resBanner;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  close() {
    this.bannerService.close();
  }

  ngOnDestroy(): void {
    this.bannerSub?.unsubscribe();
  }
}
