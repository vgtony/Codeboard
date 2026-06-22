package com.codeboard.boards;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.UUID;

final class BoardDtos {
  private BoardDtos() {
  }

  record CreateBoardRequest(@NotBlank @Size(max = 120) String title) {
  }

  record BoardResponse(UUID id, String title, List<BoardListResponse> lists) {
  }

  record BoardListResponse(UUID id, String title, List<CardResponse> cards) {
  }

  record CardResponse(UUID id, String title) {
  }
}
