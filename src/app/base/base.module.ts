import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ErrorBannerComponent } from './error-banner/error-banner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CartPageComponent } from './cart-page/cart-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    MainPageComponent,
    ErrorBannerComponent,
    PageNotFoundComponent,
    CartPageComponent,
  ],
  imports: [SharedModule, RouterModule],
  exports: [
    MainPageComponent,
    ErrorBannerComponent,
    PageNotFoundComponent,
    CartPageComponent,
  ],
})
export class BaseModule {}
