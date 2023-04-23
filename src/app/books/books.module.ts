import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './books.component';
import { TextlimitPipe } from './textlimit.pipe';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
  declarations: [BooksComponent, BookComponent, TextlimitPipe],
  imports: [CommonModule, FormsModule, RouterModule, BooksRoutingModule],
  exports: [BooksComponent, BooksComponent, TextlimitPipe],
})
export class BooksModule {}
