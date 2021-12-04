import React from 'react'
import Appeal from '../Appeal'
import Map from '../Map'
import { Data } from '../../store'

type ContentProps = {
  data: Data
}

const Content: React.FC<ContentProps> = ({ data }: ContentProps) => {
  return (
    <>
      <div className="mobile-header d-block d-lg-none">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-3">
              <div className="toggle-bar">
                <a className="menu-bar" href="#">
                  <span className="flaticon-menu"></span>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="page-title text-center nocap">
                <h2 className="title">Место разлива</h2>
              </div>
            </div>
            <div className="col-3">
              <div className="user-area text-right">
                <a className="user-image" href="#">
                  <img src="assets/images//user.png" alt="user" />
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mobile-search-form">
                <form action="#">
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      id="mobile-search"
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
        </div>
      </div>
      <div className="page-wrape">
        <div className="patient-history ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 mb-30">
                <div className="section-header">
                  <div className="section-title">
                    <h2 className="title">Место разлива</h2>
                  </div>
                </div>
                <Appeal key={data.id} data={data} />
              </div>
              <div className="col-lg-6 mb-30">
                <div className="section-header">
                  <div className="section-title">
                    <h2 className="title">Локация</h2>
                  </div>
                </div>
                <Map key={data.id} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
