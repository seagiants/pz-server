import eventManager from "./eventManager";

describe("Event manager", () => {
  it("Handle an unknown action as a no-op", () => {
    let result = eventManager({ type: "UNKNOWN_EVENT", id: 123456 });
    expect(result).toBeNull();
  });

  it("Throw an error when the payload is not looking good", () => {
    expect(() => {
      eventManager({ randomKey: "randomValue", id: 123456 });
    }).toThrow();
    expect(() => {
      eventManager({ type: "I have no id"});
    }).toThrow();
  });
});
