package com.codeboard.boards;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

class Board {
  private final UUID id;
  private final List<BoardList> lists;
  private String title;

  Board(String title, List<BoardList> lists) {
    this.id = UUID.randomUUID();
    this.title = title;
    this.lists = new ArrayList<>(lists);
  }

  UUID id() {
    return id;
  }

  String title() {
    return title;
  }

  List<BoardList> lists() {
    return List.copyOf(lists);
  }
}
