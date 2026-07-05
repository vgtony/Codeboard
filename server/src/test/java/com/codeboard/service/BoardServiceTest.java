package com.codeboard.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.codeboard.model.Board;
import com.codeboard.model.BoardList;
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

  @Test
  void renamesBoard() {
    Board board = service.createBoard("Interview Prep");

    assertThat(service.renameBoard(board.id(), "  Project Plan  "))
        .get()
        .extracting(Board::title)
        .isEqualTo("Project Plan");
  }

  @Test
  void returnsEmptyWhenRenamingMissingBoard() {
    assertThat(service.renameBoard(java.util.UUID.randomUUID(), "Project Plan")).isEmpty();
  }

  @Test
  void deletesBoard() {
    Board board = service.createBoard("Interview Prep");

    assertThat(service.deleteBoard(board.id())).isTrue();
    assertThat(service.findBoard(board.id())).isEmpty();
  }

  @Test
  void returnsFalseWhenDeletingMissingBoard() {
    assertThat(service.deleteBoard(java.util.UUID.randomUUID())).isFalse();
  }
}
