import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`
    // Confirm the file is actually served before registering — a bare register()
    // call logs a browser-level console error on 404 that .catch() can't suppress
    // (e.g. when this bundle is inlined into a single-file build with no sw.js).
    fetch(swUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          navigator.serviceWorker.register(swUrl).catch(() => {})
        }
      })
      .catch(() => {})
  })
}
