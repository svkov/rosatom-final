import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="header-area d-none d-lg-block">
      <div className="row">
        <div className="col-md-6">
          <div className="header-left">
            <div className="search-form">
              <form action="#">
                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Поиск инцидента"
                  />
                  <button type="submit" className="search-btn">
                    <span className="flaticon-loupe"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <ul className="header-right d-flex align-items-center justify-content-end">
            <li>
              <a
                className="Patient-btn"
                style={{ textTransform: 'none', backgroundColor: '#127DCB' }}
                href="#"
              >
                {'+ Добавить инцидент'}
              </a>
            </li>
            <li className="notification">
              <a href="#">
                <span className="flaticon-bell"></span>
              </a>
            </li>
            <li className="user-area">
              <a href="#">
                <img src="assets/images/user-image.png" alt="user-image" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
