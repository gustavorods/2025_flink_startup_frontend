import './App.css'
import { FileButton, FirstLink, FirstButton } from './components'
import {BrowserRouter} from 'react-router-dom'
import { Router } from './Router'


const App = () => {
 
  return (
    <>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </>
  )
}

export { App } 