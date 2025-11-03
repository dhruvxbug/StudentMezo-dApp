import { BrowserRouter } from 'react-router-dom';
import App from './app';

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
