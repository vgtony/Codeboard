import { Component, inject, signal } from '@angular/core';
import { BoardStore } from './board-store';

interface MoveMenu {
  readonly cardId: number;
  readonly listId: number;
}

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.html'
})
export class BoardPage {
  private readonly store = inject(BoardStore);

  protected readonly board = this.store.board;
  protected readonly moveMenu = signal<MoveMenu | null>(null);
  protected readonly editingCardId = signal<number | null>(null);
  protected readonly editingListId = signal<number | null>(null);

  protected addTodoCard(title: string): void {
    this.store.addTodoCard(title);
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
    this.editingListId.set(null);
    this.editingCardId.set(cardId);
  }

  protected cancelEdit(): void {
    this.editingCardId.set(null);
  }

  protected renameCard(cardId: number, title: string): void {
    this.store.renameCard(cardId, title);
    this.editingCardId.set(null);
  }

  protected deleteCard(cardId: number): void {
    this.store.deleteCard(cardId);
    if (this.editingCardId() === cardId) {
      this.editingCardId.set(null);
    }
    if (this.moveMenu()?.cardId === cardId) {
      this.moveMenu.set(null);
    }
  }

  protected editList(listId: number): void {
    this.moveMenu.set(null);
    this.editingCardId.set(null);
    this.editingListId.set(listId);
  }

  protected cancelListEdit(): void {
    this.editingListId.set(null);
  }

  protected renameList(listId: number, title: string): void {
    this.store.renameList(listId, title);
    this.editingListId.set(null);
  }

  protected deleteList(listId: number): void {
    this.store.deleteList(listId);
    if (this.editingListId() === listId) {
      this.editingListId.set(null);
    }
  }

  protected moveCard(cardId: number, fromListId: number, toListId: number): void {
    this.store.moveCard(cardId, fromListId, toListId);
    this.moveMenu.set(null);
  }

  protected addList(title: string): void {
    this.store.addList(title);
  }
}
