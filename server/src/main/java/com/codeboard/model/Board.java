package com.codeboard.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Board {
  private final UUID id;
  private final List<BoardList> lists;
  private String title;

  public Board(String title, List<BoardList> lists) {
    this.id = UUID.randomUUID();
    this.title = title;
    this.lists = new ArrayList<>(lists);
  }

  public UUID id() {
    return id;
  }

  public String title() {
    return title;
  }

  public void rename(String title) {
    this.title = title;
  }

  public List<BoardList> lists() {
    return List.copyOf(lists);
  }
}
