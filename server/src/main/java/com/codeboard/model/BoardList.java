package com.codeboard.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BoardList {
  private final UUID id;
  private final List<Card> cards;
  private final String title;

  public BoardList(String title, List<Card> cards) {
    this.id = UUID.randomUUID();
    this.title = title;
    this.cards = new ArrayList<>(cards);
  }

  public UUID id() {
    return id;
  }

  public String title() {
    return title;
  }

  public List<Card> cards() {
    return List.copyOf(cards);
  }
}
