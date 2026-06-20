import { Component, signal } from '@angular/core';

interface Card {
  readonly id: number;
  readonly title: string;
}

interface BoardList {
  readonly id: number;
  readonly title: string;
  readonly cards: readonly Card[];
}

interface Board {
  readonly title: string;
  readonly lists: readonly BoardList[];
}

interface MoveMenu {
  readonly cardId: number;
  readonly listId: number;
}

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.html'
})
export class BoardPage {
  private nextCardId = 4;
  private nextListId = 4;

  protected readonly board = signal<Board>({
    title: 'Codeboard',
    lists: [
      { id: 1, title: 'Todo', cards: [{ id: 1, title: 'Learn Angular boot flow' }] },
      { id: 2, title: 'Doing', cards: [{ id: 2, title: 'Build the UI-only board' }] },
      { id: 3, title: 'Done', cards: [{ id: 3, title: 'Create the project' }] }
    ]
  });
  protected readonly moveMenu = signal<MoveMenu | null>(null);
  protected readonly editingCardId = signal<number | null>(null);

  protected addTodoCard(title: string): void {
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

  protected openMoveMenu(cardId: number, listId: number): void {
    this.editingCardId.set(null);
    this.moveMenu.set({ cardId, listId });
  }

  protected closeMoveMenu(): void {
    this.moveMenu.set(null);
  }

  protected editCard(cardId: number): void {
    this.moveMenu.set(null);
    this.editingCardId.set(cardId);
  }

  protected cancelEdit(): void {
    this.editingCardId.set(null);
  }

  protected renameCard(cardId: number, title: string): void {
    const cardTitle = title.trim();
    if (!cardTitle) {
      this.editingCardId.set(null);
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
    this.editingCardId.set(null);
  }

  protected moveCard(cardId: number, fromListId: number, toListId: number): void {
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
    this.moveMenu.set(null);
  }

  protected addList(title: string): void {
    const listTitle = title.trim();
    if (!listTitle) {
      return;
    }

    this.board.update(board => ({
      ...board,
      lists: [...board.lists, { id: this.nextListId++, title: listTitle, cards: [] }]
    }));
  }
}
