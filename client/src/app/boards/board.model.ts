export interface Card {
  readonly id: number;
  readonly title: string;
}

export interface BoardList {
  readonly id: number;
  readonly title: string;
  readonly cards: readonly Card[];
}

export interface Board {
  readonly title: string;
  readonly lists: readonly BoardList[];
}
