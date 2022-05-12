import {
  init,
  events,
  vitals,
  measure,
  network,
  cpu,
} from '@palette.dev/electron/renderer';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { debounceLabel } from './util';

init({
  key: 'YOUR_API_KEY',
  plugins: [
    events(),
    vitals(),
    network(),
    measure(),
    cpu({ samplingInterval: 500 }),
  ],
});

// Simulate jank by blocking the main thread for < 50ms
const handleInput = () => {
  const ms = 50 * Math.random();
  const start = Date.now();
  while (Date.now() < start + ms) {} // eslint-disable-line no-empty
};

const handleInputAndLabel = debounceLabel(
  handleInput,
  () => cpu.start({ samplingInterval: 500 }),
  () => cpu.stop(),
  {
    name: 'handle-input',
    timeout: 1_000,
  }
);

const Hello = () => (
  <textarea
    placeholder="type something"
    onChange={handleInputAndLabel}
    style={{ width: '100%', height: '100%', padding: 10 }}
  />
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
