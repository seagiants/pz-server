import { GameBuilder } from "./Game";

describe("Game builder", () => {
  it("must return a Game with an id", () => {
    let gb = new GameBuilder();
    let game = gb.build();
    expect(game).toBeDefined();
    expect(game.id).not.toBeNull();
  });
  it("returns a game with a player one name", () => {
    let gb = new GameBuilder();
    let game = gb.withPlayerOne("Toto").build();
    expect(game.this.players.playerOne === "Toto");
  });
});
