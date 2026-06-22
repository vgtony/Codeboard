package com.codeboard.boards;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class BoardServiceTest {
  private final BoardService service = new BoardService();

  @Test
  void createsBoardWithDefaultLists() {
    Board board = service.createBoard("  Interview Prep  ");

    assertThat(board.title()).isEqualTo("Interview Prep");
    assertThat(board.lists()).extracting(BoardList::title)
        .containsExactly("Todo", "Doing", "Done");
  }

  @Test
  void findsBoardById() {
    Board board = service.createBoard("Interview Prep");

    assertThat(service.findBoard(board.id())).contains(board);
  }
}
