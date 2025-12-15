// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from '@/App.jsx'
// import '@/index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//   <App />
//   // </React.StrictMode>,
// )

// if (import.meta.hot) {
//   import.meta.hot.on('vite:beforeUpdate', () => {
//     window.parent?.postMessage({ type: 'sandbox:beforeUpdate' }, '*');
//   });
//   import.meta.hot.on('vite:afterUpdate', () => {
//     window.parent?.postMessage({ type: 'sandbox:afterUpdate' }, '*');
//   });
// }



import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:beforeUpdate' }, '*');
  });
  import.meta.hot.on('vite:afterUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:afterUpdate' }, '*');
  });
}
