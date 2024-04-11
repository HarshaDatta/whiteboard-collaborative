import React, { useEffect } from "react";
import Whiteboard from "./whiteboard/whiteboard";
import { connectWithSocketServer } from "./socketConn/socketConn";
import CursorOverlay from "./cursorOverlay/cursorOverlay";

function App() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);
  return (
    <div>
      <Whiteboard />
      <CursorOverlay />
    </div>
  );
}

export default App;
