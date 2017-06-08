const CREATE_GAME = "CREATE_GAME";

/* This function holds the event validation logic */
const check = event => {
  if (event.type === undefined || event.type === null) {
    return false;
  }
  if(event.id === undefined || event.id === null) {
    return false;
  }
  return true;
};

/* Manage the processing depending on the event type */
const eventManager = event => {
  if (!check(event)) {
    throw new Error("Event received is not valid");
  }
  switch (event.type) {
    case CREATE_GAME:
      console.log("Create game event");
      return {};
    default:
      console.log("Unknown event");
      return null;
  }
};

export default eventManager;
