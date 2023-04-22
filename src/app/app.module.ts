import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { CartComponent } from './cart/cart.component';
import { TextlimitPipe } from './books/textlimit.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BooksComponent,
    BookComponent,
    CartComponent,
    TextlimitPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
