package com.codeboard.boards;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

class BoardList {
  private final UUID id;
  private final List<Card> cards;
  private final String title;

  BoardList(String title, List<Card> cards) {
    this.id = UUID.randomUUID();
    this.title = title;
    this.cards = new ArrayList<>(cards);
  }

  UUID id() {
    return id;
  }

  String title() {
    return title;
  }

  List<Card> cards() {
    return List.copyOf(cards);
  }
}
