package com.codeboard.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.codeboard.model.Board;
import com.codeboard.service.BoardService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(BoardController.class)
class BoardControllerTest {
  @Autowired
  private MockMvc mvc;

  @MockitoBean
  private BoardService boards;

  @Test
  void listsBoards() throws Exception {
    when(boards.findBoards()).thenReturn(List.of(new Board("Codeboard", List.of())));

    mvc.perform(get("/api/boards"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(1)))
        .andExpect(jsonPath("$[0].title").value("Codeboard"));
  }

  @Test
  void getsBoardById() throws Exception {
    Board board = new Board("Codeboard", List.of());
    when(boards.findBoard(board.id())).thenReturn(Optional.of(board));

    mvc.perform(get("/api/boards/{boardId}", board.id()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(board.id().toString()))
        .andExpect(jsonPath("$.title").value("Codeboard"));
  }

  @Test
  void returnsNotFoundForMissingBoard() throws Exception {
    UUID boardId = UUID.randomUUID();
    when(boards.findBoard(boardId)).thenReturn(Optional.empty());

    mvc.perform(get("/api/boards/{boardId}", boardId))
        .andExpect(status().isNotFound());
  }

  @Test
  void createsBoard() throws Exception {
    when(boards.createBoard(anyString())).thenReturn(new Board("Interview Prep", List.of()));

    mvc.perform(post("/api/boards")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"title\":\"Interview Prep\"}"))
        .andExpect(status().isCreated())
        .andExpect(header().string("Location", org.hamcrest.Matchers.startsWith("/api/boards/")))
        .andExpect(jsonPath("$.title").value("Interview Prep"));
  }

  @Test
  void rejectsBlankBoardTitle() throws Exception {
    mvc.perform(post("/api/boards")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"title\":\"   \"}"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void renamesBoard() throws Exception {
    Board board = new Board("Project Plan", List.of());
    when(boards.renameBoard(eq(board.id()), anyString())).thenReturn(Optional.of(board));

    mvc.perform(patch("/api/boards/{boardId}", board.id())
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"title\":\"Project Plan\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(board.id().toString()))
        .andExpect(jsonPath("$.title").value("Project Plan"));
  }

  @Test
  void returnsNotFoundWhenRenamingMissingBoard() throws Exception {
    UUID boardId = UUID.randomUUID();
    when(boards.renameBoard(eq(boardId), anyString())).thenReturn(Optional.empty());

    mvc.perform(patch("/api/boards/{boardId}", boardId)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"title\":\"Project Plan\"}"))
        .andExpect(status().isNotFound());
  }

  @Test
  void rejectsBlankRenameTitle() throws Exception {
    mvc.perform(patch("/api/boards/{boardId}", UUID.randomUUID())
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"title\":\"   \"}"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void deletesBoard() throws Exception {
    UUID boardId = UUID.randomUUID();
    when(boards.deleteBoard(boardId)).thenReturn(true);

    mvc.perform(delete("/api/boards/{boardId}", boardId))
        .andExpect(status().isNoContent());
  }

  @Test
  void returnsNotFoundWhenDeletingMissingBoard() throws Exception {
    UUID boardId = UUID.randomUUID();
    when(boards.deleteBoard(boardId)).thenReturn(false);

    mvc.perform(delete("/api/boards/{boardId}", boardId))
        .andExpect(status().isNotFound());
  }
}
