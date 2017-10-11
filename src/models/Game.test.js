import { GameBuilder, statuses } from "./Game";

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
    expect(game.players.playerOne).toBe("Toto");
  });
  it("returns a created game with an ok status", () => {
    let gb = new GameBuilder();
    let game = gb.withPlayerOne("Toto").build();
    expect(game.getStatus()).toBe(statuses.WAITING_FOR_SECOND_PLAYER);
  });
});
