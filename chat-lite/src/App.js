import React from 'react';
import reducer from './reducer';
import JoinBlock from './components/JoinBlock';

import socket from './socket';



function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomID: null,
    userName: null,
  })

  const onLogin = (obj) => {
    console.log('123')
    dispatch({
      type: 'JOINED',
      payload: obj,
    })
    socket.emit('ROOM:JOIN', obj)
  }

  return (
    <div className="wrapper">{!state.isAuth && <JoinBlock onLogin={onLogin} />}</div>
  );
}

export default App;
