import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { multiBooksResolver } from '../core/resolvers/multi-books.resolver';
import { discountResolver } from '../core/resolvers/discount.resolver';
import { adminInfoGuard } from '../core/guards/admin-info.guard';

const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  {
    path: 'info',
    component: AdminInfoComponent,
    canActivate: [adminInfoGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [adminInfoGuard],
    resolve: { books: multiBooksResolver, discount: discountResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAuthRoutingModule {}
