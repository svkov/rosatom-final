import React from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import Main from '../Main'

const App: React.FC = () => {
  return (
    <>
      <div className="preloader">
        <span className="loader">
          <span className="loader-inner"></span>
        </span>
      </div>
      <div className="main-wrapper">
        <Sidebar />
        <div className="main-content-wraper">
          <Header />
          <Main />
        </div>
      </div>
    </>
  )
}

export default App
