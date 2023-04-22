import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  defaultImgUrl: string =
    'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg';

  // Configuring Google API query

  googleApiUrl: string = `https://www.googleapis.com/books/v1/volumes`;
  apiKey: string = `AIzaSyBEGkkKXEkZsWORJ77einlFDaIZ_2WpcDQ`;

  // Configuring Google API query

  // Searching books
  searchBooks(queryParam: string): Observable<any> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('key', this.apiKey);
    searchParams = searchParams.append('maxResults', '18');
    // searchParams = searchParams.append('projection', 'lite');
    this.books = [];

    return this.http
      .get<any>(this.googleApiUrl + `?q=${queryParam}`, {
        params: searchParams,
      })
      .pipe(
        map((response) => {
          return response['items'].map(
            (items: {
              id: string;
              volumeInfo: {
                title: string;
                authors: string;
                imageLinks: { thumbnail: string | undefined };
                description: string;
              };
              saleInfo: { listPrice: { amount: number | undefined } };
            }) => {
              this.book = new Book({
                id: items.id,
                name: items.volumeInfo.title,
                author: items.volumeInfo.authors,
                price: items.saleInfo.listPrice?.amount || null,
                imgUrl:
                  items.volumeInfo.imageLinks?.thumbnail || this.defaultImgUrl,
                desc: items.volumeInfo.description,
                inCard: false,
              });
              this.books.push(this.book);
              // console.log(this.book);
            }
          );
        })
      );
  }

  book: Book = {
    id: '0',
    name: 'İki Şehrin Hikayesi',
    author: 'Charles Dickens',
    price: 56.0,
    imgUrl: 'https://i.dr.com.tr/cache/500x400-0/originals/0001788068001-1.jpg',
    desc: `Dünya edebiyatının en önemli yapıtlarından olan İki Şehrin Hikâyesi, 
    Paris ve Londra arasında gelişen olay kurgusuyla, tarihin en hareketli anlarından birinin, 
    Fransız Devrimi’nin ekseni etrafında biçimlenir. Edebiyat dünyasının “Dickens’ın 
    en büyük tarihî romanı”, yazarın kendisinin ise “yazdığım en iyi hikâye” diye tanımladıkları yapıt, 
    Fransız Devrimi’nin Terör döneminde...`,
    inCard: false,
  };

  books: Book[] = [this.book];
  cart: Book[] = [];

  searchSubject = new Subject<string>();

  private cartSubject = new BehaviorSubject<Book[]>(this.cart);
  cartSub$ = this.cartSubject.asObservable();

  getBooks() {
    return this.books.slice();
  }

  getCart() {
    return this.cart.slice();
  }

  addToCart(book: Book) {
    book.inCard = true;
    if (this.cart.filter((value) => value != book)) {
      this.cart.push(book);
      this.cartSubject.next(this.cart.slice());
    }
  }

  removeFromCart(book: Book) {
    book.inCard = false;
    this.cart = this.cart.filter((value) => value != book);
    this.cartSubject.next(this.cart.slice());
  }
}
