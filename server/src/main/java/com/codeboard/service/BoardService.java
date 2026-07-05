package com.codeboard.service;

import com.codeboard.model.Board;
import com.codeboard.model.BoardList;
import com.codeboard.model.Card;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
  private final List<Board> boards = new ArrayList<>(List.of(
      new Board("Codeboard", List.of(
          new BoardList("Todo", List.of(new Card("Learn Spring Boot API flow"))),
          new BoardList("Doing", List.of()),
          new BoardList("Done", List.of())
      ))
  ));

  public List<Board> findBoards() {
    return List.copyOf(boards);
  }

  public Optional<Board> findBoard(UUID id) {
    return boards.stream()
        .filter(board -> board.id().equals(id))
        .findFirst();
  }

  public Board createBoard(String title) {
    Board board = new Board(title.trim(), List.of(
        new BoardList("Todo", List.of()),
        new BoardList("Doing", List.of()),
        new BoardList("Done", List.of())
    ));
    boards.add(board);
    return board;
  }

  public Optional<Board> renameBoard(UUID id, String title) {
    return findBoard(id)
        .map(board -> {
          board.rename(title.trim());
          return board;
        });
  }

  public boolean deleteBoard(UUID id) {
    return boards.removeIf(board -> board.id().equals(id));
  }
}
