import { TestBed } from '@angular/core/testing';
import { BoardStore } from './board-store';

describe('BoardStore', () => {
  let store: BoardStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(BoardStore);
  });

  it('should add cards to Todo', () => {
    store.addTodoCard('Explain stores');

    const todo = store.board().lists.find(list => list.title === 'Todo');
    expect(todo?.cards.at(-1)?.title).toBe('Explain stores');
  });

  it('should move cards between lists', () => {
    store.moveCard(1, 1, 3);

    const todo = store.board().lists.find(list => list.id === 1);
    const done = store.board().lists.find(list => list.id === 3);
    expect(todo?.cards.some(card => card.id === 1)).toBe(false);
    expect(done?.cards.some(card => card.id === 1)).toBe(true);
  });

  it('should not delete non-empty lists', () => {
    store.deleteList(1);

    expect(store.board().lists.some(list => list.id === 1)).toBe(true);
  });

  it('should delete empty lists', () => {
    store.addList('Review');
    const review = store.board().lists.find(list => list.title === 'Review');

    store.deleteList(review?.id ?? 0);

    expect(store.board().lists.some(list => list.title === 'Review')).toBe(false);
  });
});
