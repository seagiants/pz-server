const CREATE_GAME = "CREATE_GAME";

const eventManager = (event) => {
  switch(event.type) {
    case CREATE_GAME:
      console.log("Create game event");
      return {};
    default:
      console.log("Unknown event");
      return null;
  }
}

export default eventManager;
