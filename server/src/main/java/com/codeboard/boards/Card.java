package com.codeboard.boards;

import java.util.UUID;

class Card {
  private final UUID id;
  private final String title;

  Card(String title) {
    this.id = UUID.randomUUID();
    this.title = title;
  }

  UUID id() {
    return id;
  }

  String title() {
    return title;
  }
}
