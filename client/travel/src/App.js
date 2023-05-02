import './App.css';
import * as React from 'react';
import Map from './Map';


function App() {
  
  const pushPins = [
    {
      location: [47.6097, -122.3331],
      option: { color: 'red' },
    },
    {
      location: [47.6, -122.3],
      option: { color: 'blue' },
    },
  ];

  return (
    <div>
      <Map pushPins={pushPins}/>
    </div>
  );
}

export default App;
