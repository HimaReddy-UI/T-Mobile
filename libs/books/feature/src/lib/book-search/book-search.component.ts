import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  booksSubscription: any;
  searchBookChangedSubscription: any;
  searchBookChanged = new Subject<string>();
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
  this.booksSubscription =  this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    
    this.searchBookChangedSubscription = this.searchBookChanged.pipe(
      debounceTime(500)
    ).subscribe(searchText => this.searchBooks(searchText));
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks(this.searchForm.value.term);
  }

  searchBooks(searchBook) {
    if (searchBook) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.booksSubscription && this.booksSubscription.unsubscribe();
    this.searchBookChangedSubscription && this.searchBookChangedSubscription.unsubscribe()
  }

  fetchBooks() {
    this.searchBookChanged.next(this.searchForm.value.term);
  }
}
