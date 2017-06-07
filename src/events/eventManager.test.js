import eventManager from "./eventManager";

describe("Event manager", () => {
  it("Handle an unknown action as a no-op", () => {
    let result = eventManager({type:"UNKNOWN_EVENT"});
    expect(result).toBeNull();
  });
});
