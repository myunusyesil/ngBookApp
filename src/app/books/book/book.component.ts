import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input()
  singleBook!: Book;
  isAddedtoCart: boolean = false;
  searchParam: string = '';

  constructor(private booksService: BooksService) {}

  onAddCart(e: any) {
    if (this.singleBook.inCard == false) {
      this.booksService.addToCart(this.singleBook);
    }
  }

  onRemoveCart(e: any) {
    if (this.singleBook.inCard == true) {
      this.booksService.removeFromCart(this.singleBook);
    }
  }

  ngOnInit(): void {}
}
