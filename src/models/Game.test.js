import { GameBuilder } from "./Game";

describe("Game builder", () => {
  it("must return a Game with an id", () => {
    let gb = new GameBuilder();
    let game = gb.build();
    expect(game).toBeDefined();
    expect(game.id).not.toBeNull();
  });
});