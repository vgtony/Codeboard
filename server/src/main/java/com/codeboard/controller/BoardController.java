package com.codeboard.controller;

import com.codeboard.dto.BoardDtos.BoardListResponse;
import com.codeboard.dto.BoardDtos.BoardResponse;
import com.codeboard.dto.BoardDtos.CardResponse;
import com.codeboard.dto.BoardDtos.CreateBoardRequest;
import com.codeboard.dto.BoardDtos.RenameBoardRequest;
import com.codeboard.model.Board;
import com.codeboard.model.BoardList;
import com.codeboard.service.BoardService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/boards")
public class BoardController {
  private final BoardService boards;

  public BoardController(BoardService boards) {
    this.boards = boards;
  }

  @GetMapping
  List<BoardResponse> boards() {
    return boards.findBoards().stream()
        .map(BoardController::toResponse)
        .toList();
  }

  @GetMapping("/{boardId}")
  BoardResponse board(@PathVariable UUID boardId) {
    return boards.findBoard(boardId)
        .map(BoardController::toResponse)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));
  }

  @PostMapping
  ResponseEntity<BoardResponse> createBoard(@Valid @RequestBody CreateBoardRequest request) {
    Board board = boards.createBoard(request.title());
    return ResponseEntity.created(URI.create("/api/boards/" + board.id()))
        .body(toResponse(board));
  }

  @PatchMapping("/{boardId}")
  BoardResponse renameBoard(
      @PathVariable UUID boardId,
      @Valid @RequestBody RenameBoardRequest request
  ) {
    return boards.renameBoard(boardId, request.title())
        .map(BoardController::toResponse)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));
  }

  @DeleteMapping("/{boardId}")
  ResponseEntity<Void> deleteBoard(@PathVariable UUID boardId) {
    if (!boards.deleteBoard(boardId)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found");
    }

    return ResponseEntity.noContent().build();
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
