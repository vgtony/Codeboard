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
    const input = compiled.querySelector('input') as HTMLInputElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    input.value = 'Explain signals';
    button.click();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Explain signals');
    expect(input.value).toBe('');
  });
});
