package com.codeboard.model;

import java.util.UUID;

public class Card {
  private final UUID id;
  private final String title;

  public Card(String title) {
    this.id = UUID.randomUUID();
    this.title = title;
  }

  public UUID id() {
    return id;
  }

  public String title() {
    return title;
  }
}
