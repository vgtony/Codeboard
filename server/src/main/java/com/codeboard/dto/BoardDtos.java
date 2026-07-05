package com.codeboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.UUID;

public final class BoardDtos {
  private BoardDtos() {
  }

  public record CreateBoardRequest(@NotBlank @Size(max = 120) String title) {
  }

  public record RenameBoardRequest(@NotBlank @Size(max = 120) String title) {
  }

  public record BoardResponse(UUID id, String title, List<BoardListResponse> lists) {
  }

  public record BoardListResponse(UUID id, String title, List<CardResponse> cards) {
  }

  public record CardResponse(UUID id, String title) {
  }
}
