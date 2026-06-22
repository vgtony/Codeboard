import { TestBed } from '@angular/core/testing';
import { BoardPage } from './board-page';

describe('BoardPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardPage]
    }).compileComponents();
  });

  it('should render board title', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain('Codeboard');
  });

  it('should add a todo card', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[aria-label="New todo card title"]') as HTMLInputElement;
    const button = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.includes('Add card')) as HTMLButtonElement;

    input.value = 'Explain signals';
    button.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Explain signals');
    expect(input.value).toBe('');
  });

  it('should show move options when a card is clicked', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const moveButton = card.querySelector('button') as HTMLButtonElement;

    moveButton.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Move To');
    expect(compiled.textContent).toContain('Doing');
    expect(compiled.textContent).toContain('Done');
  });

  it('should move a card to the selected list', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const moveButton = card.querySelector('button') as HTMLButtonElement;

    moveButton.click();
    fixture.detectChanges();

    const doneButton = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Done') as HTMLButtonElement;

    doneButton.click();
    fixture.detectChanges();

    const doneList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Done')) as HTMLElement;
    const todoList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Todo')) as HTMLElement;

    expect(doneList.textContent).toContain('Learn Angular boot flow');
    expect(todoList.textContent).not.toContain('Learn Angular boot flow');
  });

  it('should close the move menu without moving a card', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const moveButton = card.querySelector('button') as HTMLButtonElement;

    moveButton.click();
    fixture.detectChanges();

    const cancel = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Cancel') as HTMLButtonElement;

    cancel.click();
    fixture.detectChanges();

    const todoList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Todo')) as HTMLElement;

    expect(compiled.textContent).not.toContain('Move To');
    expect(todoList.textContent).toContain('Learn Angular boot flow');
  });

  it('should rename a card', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const edit = [...card.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Edit') as HTMLButtonElement;

    edit.click();
    fixture.detectChanges();

    const input = compiled.querySelector('[aria-label="Edit card Learn Angular boot flow"]') as HTMLInputElement;
    const save = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Save') as HTMLButtonElement;

    input.value = 'Explain Angular signals';
    save.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Explain Angular signals');
    expect(compiled.textContent).not.toContain('Learn Angular boot flow');
  });

  it('should cancel editing a card', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const edit = [...card.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Edit') as HTMLButtonElement;

    edit.click();
    fixture.detectChanges();

    const cancel = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Cancel') as HTMLButtonElement;

    cancel.click();
    fixture.detectChanges();

    expect(compiled.querySelector('input[aria-label^="Edit card"]')).toBeNull();
    expect(compiled.textContent).toContain('Learn Angular boot flow');
  });

  it('should ignore blank card titles', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const edit = [...card.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Edit') as HTMLButtonElement;

    edit.click();
    fixture.detectChanges();

    const input = compiled.querySelector('[aria-label="Edit card Learn Angular boot flow"]') as HTMLInputElement;
    const save = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Save') as HTMLButtonElement;

    input.value = '   ';
    save.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Learn Angular boot flow');
    expect(compiled.querySelector('input[aria-label^="Edit card"]')).toBeNull();
  });

  it('should delete a card', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const deleteButton = [...card.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Delete') as HTMLButtonElement;

    deleteButton.click();
    fixture.detectChanges();

    expect(compiled.textContent).not.toContain('Learn Angular boot flow');
  });

  it('should not offer the current list as a move target', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = [...compiled.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Learn Angular boot flow')) as HTMLElement;
    const moveButton = card.querySelector('button') as HTMLButtonElement;

    moveButton.click();
    fixture.detectChanges();

    const menu = card;

    expect(menu.textContent).not.toContain('Todo');
    expect(menu.textContent).toContain('Doing');
    expect(menu.textContent).toContain('Done');
  });

  it('should add a list', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[aria-label="New list title"]') as HTMLInputElement;
    const button = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.includes('Add list')) as HTMLButtonElement;

    input.value = 'Review';
    button.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Review');
    expect(input.value).toBe('');
  });

  it('should rename a list', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const todoList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Todo')) as HTMLElement;
    const edit = todoList.querySelector('button') as HTMLButtonElement;

    edit.click();
    fixture.detectChanges();

    const input = compiled.querySelector('[aria-label="Edit list Todo"]') as HTMLInputElement;
    const save = [...todoList.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Save') as HTMLButtonElement;

    input.value = 'Backlog';
    save.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Backlog');
    expect(compiled.textContent).not.toContain('Todo');
  });

  it('should cancel editing a list', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const todoList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Todo')) as HTMLElement;
    const edit = todoList.querySelector('button') as HTMLButtonElement;

    edit.click();
    fixture.detectChanges();

    const cancel = [...todoList.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Cancel') as HTMLButtonElement;

    cancel.click();
    fixture.detectChanges();

    expect(compiled.querySelector('input[aria-label^="Edit list"]')).toBeNull();
    expect(compiled.textContent).toContain('Todo');
  });

  it('should ignore blank list titles', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const todoList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Todo')) as HTMLElement;
    const edit = todoList.querySelector('button') as HTMLButtonElement;

    edit.click();
    fixture.detectChanges();

    const input = compiled.querySelector('[aria-label="Edit list Todo"]') as HTMLInputElement;
    const save = [...todoList.querySelectorAll('button')]
      .find(item => item.textContent?.trim() === 'Save') as HTMLButtonElement;

    input.value = '   ';
    save.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Todo');
    expect(compiled.querySelector('input[aria-label^="Edit list"]')).toBeNull();
  });

  it('should delete an empty list', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[aria-label="New list title"]') as HTMLInputElement;
    const addList = [...compiled.querySelectorAll('button')]
      .find(item => item.textContent?.includes('Add list')) as HTMLButtonElement;

    input.value = 'Review';
    addList.click();
    fixture.detectChanges();

    const reviewList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Review')) as HTMLElement;
    const deleteList = reviewList.querySelector('[aria-label="Delete list Review"]') as HTMLButtonElement;

    deleteList.click();
    fixture.detectChanges();

    expect(compiled.textContent).not.toContain('Review');
  });

  it('should not show delete for non-empty lists', () => {
    const fixture = TestBed.createComponent(BoardPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const todoList = [...compiled.querySelectorAll('article')]
      .find(item => item.querySelector('h2')?.textContent?.includes('Todo')) as HTMLElement;

    expect(todoList.querySelector('[aria-label="Delete list Todo"]')).toBeNull();
  });
});
