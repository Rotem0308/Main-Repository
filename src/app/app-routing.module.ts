import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './book/books/books.component';
import { singleBookResolver } from './core/resolvers/single-book.resolver';
import { BookInfoComponent } from './book/book-info/book-info.component';
import { PageNotFoundComponent } from './base/page-not-found/page-not-found.component';
import { userInfoGuard } from './core/guards/user-info.guard';
import { adminInfoGuard } from './core/guards/admin-info.guard';
import { CartPageComponent } from './base/cart-page/cart-page.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'cart', component: CartPageComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-auth/admin-auth.module').then(
        (module) => module.AdminAuthModule
      ),
  },
  {
    path: ':id',
    component: BookInfoComponent,
    resolve: { book: singleBookResolver },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
