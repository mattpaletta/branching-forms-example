import React from 'react';

import FriendshipFormController from "./components/FriendshipFormController";
import appStyles from "./App.module.scss"

function App() {
  return (
    <div className={appStyles.container}>
            <p>This is only an example, no information is logged or stored.</p>
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <FriendshipFormController />
    </div>
  );
}

export default App;
