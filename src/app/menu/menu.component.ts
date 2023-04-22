import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../books/books.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private booksService: BooksService) {}
  input: string = '';

  ngOnInit(): void {}

  onSearch(f: NgForm) {
    this.input = f.controls['search'].value.toLowerCase();
    this.booksService.searchSubject.next(this.input);
    f.reset();
  }
}
