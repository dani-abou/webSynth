import Nexus from 'nexusui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Dial, Piano, Position, Slider } from 'react-nexusui';
import useWebSocket from 'react-use-websocket';
import './App.css';

const WS_URL = "wss://websynth-socket.glitch.me"

function App() {

  const [screenName, setScreenName] = useState('')
  const [position, setPosition] = useState([0.5, 0.5]);

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
  });

  const onNameChange = e => {
    const name = e.target.value;
    setScreenName(name);
    sendMessage(JSON.stringify({ location: 'name', operation: 'set', value: [name] }))
  }

  const onMouseDown = () => {
    sendMessage(JSON.stringify({ location: 'keyDown', operation: 1, value: [] }))
    console.log('down')
  }

  const onMouseUp = () => {
    sendMessage(JSON.stringify({ location: 'keyDown', operation: 0, value: [] }))
    console.log('up')

  }

  const divRef = useRef();

  const onChange = e => {
    sendMessage(JSON.stringify({ location: 'position', operation: 'clear', value: [] }))
    sendMessage(JSON.stringify({ location: 'position', operation: e.x, value: [e.y] }))
  }

  return (
    <div className='contents'>

      <h1 className='title'>WebSynths</h1>

      <p>Your screen name:   <input value={screenName} onChange={onNameChange} className='name-input' /></p>

      <br />
      <p>Your sound: {lastMessage ? JSON.parse(lastMessage.data).sound : 'loading'}</p>
      {console.log(lastMessage)}

      <br /><br />
      <br /><br />

      <div className='position' ref={divRef} >
        <Position
          size={[350, 350]}
          mode='relative'
          x={position[0]}
          y={position[1]}
          minX={0}
          minY={0}
          maxX={2}
          maxY={2}
          onChange={onChange}
          onReady={pos => {
            // pos.element.onmousedown = onMouseDown;
            // pos.element.onmouseup = onMouseUp;
            pos.element.onpointerdown = onMouseDown;
            pos.element.onpointerup = onMouseUp;
          }}
        />
      </div>

    </div>
  );
}


export default App;

