import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Token from './pages/Token'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MenuModal from './components/MenuModal'
import { FaGithub } from 'react-icons/fa'

function App() {
  return (
    <div>
      <Router>
        <div className="layout shadow-xl border-gray-400">
          <Header />

          <div className="grid w-screen grid-cols-1 lg:grid-cols-5">
            <Sidebar />

            <div className="lg:col-span-4 bg-gray-200">
              <Switch>
                <Route path="/token">
                  <Token />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
        <MenuModal />
      </Router>
      <footer className="h-12 bg-white flex items-center">
        <a
          href="https://github.com/mikko-o/rarity-analyser"
          className="w-5 h-5 ml-6"
        >
          <FaGithub className="w-full h-full text-gray-500" />
        </a>
      </footer>
    </div>
  )
}

export default App
