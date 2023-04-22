import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { Subscription, distinctUntilChanged, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[] = this.booksService.getBooks();
  searchParam: string = '';
  subscription = new Subscription();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    // debugger;
    this.subscription = this.booksService.searchSubject
      .pipe(
        filter((search) => search !== ''),
        distinctUntilChanged(),
        switchMap((data) => {
          return this.booksService.searchBooks(data);
        })
      )
      .subscribe(() => {
        this.books = this.booksService.getBooks();
        console.log(this.books);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
