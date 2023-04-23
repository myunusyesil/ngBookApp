import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books/books.service';
import { Book } from '../books/book.model';
import { Observable, Subscription, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  cart: Book[] = [];
  cart$: Observable<any> = of([]);

  onClickDelete(book: Book) {
    this.booksService.removeFromCart(book);
  }
  // Using async pipe for subscribe and unsubscribe
  ngOnInit(): void {
    this.cart$ = this.booksService.cartSub$.pipe(
      tap((data) => {
        this.cart = this.booksService.getCart();
        console.log(data);
      }),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
}
