import { BrowserRouter } from 'react-router-dom';
import App from './App';

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
