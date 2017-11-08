const CREATE_GAME = "CREATE_GAME";

/* This function holds the event validation logic */
const check = event => {
  if (event.type === undefined || event.type === null) {
    return false;
  }
  return true;
};

/* Manage the processing depending on the event type */
class EventManager {
  constructor(game) {
    this._game = game;
  }

  handleEvent(event) {
    if (!check(event)) {
      throw new Error("Event received is not valid");
    }
    switch (event.type) {
      case "END_TURN":
        console.log("end turn event");
        // TODO implement
        return { type: "CHANGE_PLAYER_TURN", data: "NONE" };
      default:
        console.log("Unknown event");
        return null;
    }
  }
}

export default EventManager;
