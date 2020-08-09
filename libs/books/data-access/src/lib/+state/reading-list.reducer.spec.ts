import { expect } from 'chai';
import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).to.be.true;
      expect(result.ids.length).to.eq(3);
    });

    it('Remove from ReadingList should remove from reading list', () => {
      const action = ReadingListActions.removeFromReadingList({
        item: createReadingListItem('B')
      });

      const result: State = reducer(state, action);

      expect(result.ids).to.eql(['A']);
    });


    it('addToReadingList should add book to reading list', () => {
      const action = ReadingListActions.addToReadingList({
        book: createBook('C')
      });
      const result: State = reducer(state, action);

      expect(result.ids).to.eql(['A', 'B', 'C']);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).to.eql(initialState);
    });
  });
});
