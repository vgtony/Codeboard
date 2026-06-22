package com.codeboard.boards;

import com.codeboard.boards.BoardDtos.BoardListResponse;
import com.codeboard.boards.BoardDtos.BoardResponse;
import com.codeboard.boards.BoardDtos.CardResponse;
import com.codeboard.boards.BoardDtos.CreateBoardRequest;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boards")
class BoardController {
  private final BoardService boards;

  BoardController(BoardService boards) {
    this.boards = boards;
  }

  @GetMapping
  List<BoardResponse> boards() {
    return boards.findBoards().stream()
        .map(BoardController::toResponse)
        .toList();
  }

  @PostMapping
  ResponseEntity<BoardResponse> createBoard(@Valid @RequestBody CreateBoardRequest request) {
    Board board = boards.createBoard(request.title());
    return ResponseEntity.created(URI.create("/api/boards/" + board.id()))
        .body(toResponse(board));
  }

  private static BoardResponse toResponse(Board board) {
    return new BoardResponse(board.id(), board.title(), board.lists().stream()
        .map(BoardController::toResponse)
        .toList());
  }

  private static BoardListResponse toResponse(BoardList list) {
    return new BoardListResponse(list.id(), list.title(), list.cards().stream()
        .map(card -> new CardResponse(card.id(), card.title()))
        .toList());
  }
}
