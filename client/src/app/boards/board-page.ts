import { Component, signal } from '@angular/core';

interface Card {
  readonly title: string;
}

interface BoardList {
  readonly title: string;
  readonly cards: readonly Card[];
}

interface Board {
  readonly title: string;
  readonly lists: readonly BoardList[];
}

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.html'
})
export class BoardPage {
  protected readonly board = signal<Board>({
    title: 'Codeboard',
    lists: [
      { title: 'Todo', cards: [{ title: 'Learn Angular boot flow' }] },
      { title: 'Doing', cards: [{ title: 'Build the UI-only board' }] },
      { title: 'Done', cards: [{ title: 'Create the project' }] }
    ]
  });

  protected addTodoCard(title: string): void {
    const cardTitle = title.trim();
    if (!cardTitle) {
      return;
    }

    this.board.update(board => ({
      ...board,
      lists: board.lists.map((list, index) =>
        index === 0 ? { ...list, cards: [...list.cards, { title: cardTitle }] } : list
      )
    }));
  }
}
