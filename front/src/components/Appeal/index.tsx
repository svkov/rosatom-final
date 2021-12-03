import React, { useState, useCallback } from 'react'
import { render } from 'react-dom'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { photos } from './photos'
import './index.css'

const Appeal: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <div className="section-wrapper">
      <br />
      <h2 className="title" style={{ color: '#292968', fontSize: 24 }}>
        Обращение №45-88
      </h2>
      <br />
      Оповещение системы
      <br />
      <br />
      <br />
      <div className="container">
        <div className="tab" role="tabpanel">
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className="active">
              <a
                href="#Section1"
                aria-controls="home"
                role="tab"
                data-toggle="tab"
              >
                Данные о разливе
              </a>
            </li>
            <li role="presentation">
              <a
                href="#Section2"
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
              >
                Предприятия
              </a>
            </li>
            <li role="presentation">
              <a
                href="#Section3"
                aria-controls="messages"
                role="tab"
                data-toggle="tab"
              >
                Фото
              </a>
            </li>
            <li role="presentation">
              <a
                href="#Section4"
                aria-controls="messages"
                role="tab"
                data-toggle="tab"
              >
                Флора и фауна
              </a>
            </li>
          </ul>
          <div className="tab-content tabs">
            <div
              role="tabpanel"
              className="tab-pane fade in active"
              id="Section1"
            >
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Дата пришествия</td>
                    <td>30 Ноября 2021</td>
                  </tr>
                  <tr>
                    <td>Координаты</td>
                    <td>0000000000000</td>
                  </tr>
                  <tr>
                    <td>Регион</td>
                    <td>Московская область</td>
                  </tr>
                  <tr>
                    <td>Локация</td>
                    <td>Почва</td>
                  </tr>
                  <tr>
                    <td>Оценка ущерба</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="Section2">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Завод по переработке</td>
                    <td>Адрес</td>
                  </tr>
                  <tr>
                    <td>Трубопровод 54 -77</td>
                    <td>Координаты</td>
                  </tr>
                  <tr>
                    <td>Нефтепровод А 54 -77</td>
                    <td>Координаты</td>
                  </tr>
                  <tr>
                    <td>АЗС Ромашка 547</td>
                    <td>Адрес</td>
                  </tr>
                  <tr>
                    <td>АЗС Нефтепродукты</td>
                    <td>Адрес</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="Section3">
              <div>
                <Gallery photos={photos} onClick={openLightbox} />
                <ModalGateway>
                  {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                      <Carousel
                        currentIndex={currentImage}
                        // @ts-ignore
                        views={photos.map((x) => ({
                          ...x,
                          // @ts-ignore
                          srcset: x.srcSet,
                          // @ts-ignore
                          caption: x.title,
                        }))}
                      />
                    </Modal>
                  ) : null}
                </ModalGateway>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="Section4">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Зверобойник брасчатый</td>
                    <td className="rare">Редкий</td>
                  </tr>
                  <tr>
                    <td>Подкобыльник рябристый </td>
                    <td className="conditional">Условно редкий</td>
                  </tr>
                  <tr>
                    <td>Приземистая выхухоль</td>
                    <td className="rare">Очень редкий</td>
                  </tr>
                  <tr>
                    <td>Чернушка великолесистая </td>
                    <td className="rare">Редкий</td>
                  </tr>
                  <tr>
                    <td>Медовик бурый</td>
                    <td className="conditional">Условно редкий</td>
                  </tr>
                </tbody>
              </table>
            </div>
                            
          </div>
                      
        </div>
                
      </div>
          
    </div>
  )
}

export default Appeal
