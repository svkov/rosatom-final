import React from 'react'

import logo from './Logo.svg'

const Sidebar: React.FC = () => {
  return (
    <div className="main-sidebar ">
      <div className="sidebar-wrap scrollbar-inner">
        <div className="brand-area">
          <a href="index.html">
            <img src={logo} alt="medico" />
          </a>
        </div>
        <nav className="menu-area ">
          <ul id="metismenu">
            <li className="">
              <a href="#">
                <i className="flaticon-alarm"></i> Архив
              </a>
            </li>
            <li>
              <a href="#">
                <i className="flaticon-financial"></i> Отчеты
              </a>
            </li>
            <li>
              <a href="#">
                <i className="flaticon-user"></i> Ответственные
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
