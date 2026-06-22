import { Injectable, signal } from '@angular/core';
import { Board } from './board.model';

@Injectable({ providedIn: 'root' })
export class BoardStore {
  private nextCardId = 4;
  private nextListId = 4;

  readonly board = signal<Board>({
    title: 'Codeboard',
    lists: [
      { id: 1, title: 'Todo', cards: [{ id: 1, title: 'Learn Angular boot flow' }] },
      { id: 2, title: 'Doing', cards: [{ id: 2, title: 'Build the UI-only board' }] },
      { id: 3, title: 'Done', cards: [{ id: 3, title: 'Create the project' }] }
    ]
  });

  addTodoCard(title: string): void {
    const cardTitle = title.trim();
    if (!cardTitle) {
      return;
    }

    this.board.update(board => ({
      ...board,
      lists: board.lists.map(list =>
        list.id === 1 ? { ...list, cards: [...list.cards, { id: this.nextCardId++, title: cardTitle }] } : list
      )
    }));
  }

  renameCard(cardId: number, title: string): void {
    const cardTitle = title.trim();
    if (!cardTitle) {
      return;
    }

    this.board.update(board => ({
      ...board,
      lists: board.lists.map(list => ({
        ...list,
        cards: list.cards.map(card =>
          card.id === cardId ? { ...card, title: cardTitle } : card
        )
      }))
    }));
  }

  deleteCard(cardId: number): void {
    this.board.update(board => ({
      ...board,
      lists: board.lists.map(list => ({
        ...list,
        cards: list.cards.filter(card => card.id !== cardId)
      }))
    }));
  }

  moveCard(cardId: number, fromListId: number, toListId: number): void {
    this.board.update(board => {
      const fromList = board.lists.find(list => list.id === fromListId);
      if (!fromList || fromListId === toListId) {
        return board;
      }

      const card = fromList.cards.find(item => item.id === cardId);
      if (!card) {
        return board;
      }

      return {
        ...board,
        lists: board.lists.map(list => {
          if (list.id === fromListId) {
            return { ...list, cards: list.cards.filter(item => item.id !== cardId) };
          }
          if (list.id === toListId) {
            return { ...list, cards: [...list.cards, card] };
          }
          return list;
        })
      };
    });
  }

  addList(title: string): void {
    const listTitle = title.trim();
    if (!listTitle) {
      return;
    }

    this.board.update(board => ({
      ...board,
      lists: [...board.lists, { id: this.nextListId++, title: listTitle, cards: [] }]
    }));
  }

  renameList(listId: number, title: string): void {
    const listTitle = title.trim();
    if (!listTitle) {
      return;
    }

    this.board.update(board => ({
      ...board,
      lists: board.lists.map(list =>
        list.id === listId ? { ...list, title: listTitle } : list
      )
    }));
  }

  deleteList(listId: number): void {
    this.board.update(board => ({
      ...board,
      lists: board.lists.filter(list => list.id !== listId || list.cards.length > 0)
    }));
  }
}
