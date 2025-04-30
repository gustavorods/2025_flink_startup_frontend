import './App.css';
import {BrowserRouter} from 'react-router-dom'
import { Router } from './Router'
import { FileButton, FirstLink, NavbarSemLogin } from './components'

const App = () => {
 
  return (
    <>
    <NavbarSemLogin />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export { App } 