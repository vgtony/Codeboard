package com.codeboard.boards;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
class BoardService {
  private final List<Board> boards = new ArrayList<>(List.of(
      new Board("Codeboard", List.of(
          new BoardList("Todo", List.of(new Card("Learn Spring Boot API flow"))),
          new BoardList("Doing", List.of()),
          new BoardList("Done", List.of())
      ))
  ));

  List<Board> findBoards() {
    return List.copyOf(boards);
  }

  Board createBoard(String title) {
    Board board = new Board(title.trim(), List.of(
        new BoardList("Todo", List.of()),
        new BoardList("Doing", List.of()),
        new BoardList("Done", List.of())
    ));
    boards.add(board);
    return board;
  }
}
