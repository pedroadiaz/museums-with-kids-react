// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route } from 'react-router-dom'
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NxWelcome title='Museums with Kids'/>} />
      </Routes>
    </div>
  );
}

export default App;
