import ReactDOM from 'react-dom/client';
import { App } from "./view/App";
import './main.scss'

ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(<App/>)
  