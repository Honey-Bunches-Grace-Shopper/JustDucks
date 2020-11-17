import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <h1 id="title">
        Just Ducks
        {/* <img src="just_ducks.jpg" alt="rubber duck" width="200" height="100"/> */}
      </h1>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
