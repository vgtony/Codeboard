package com.codeboard.boards;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
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
}
