import React, { useState, useCallback } from 'react'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { photos } from './photos'
import { Data } from '../../store'
import './index.css'

type Props = {
  data: Data
}

const Appeal: React.FC<Props> = ({ data }: Props) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const getColorClassName = (type: string) => {
    switch (type) {
      case 'Редкий':
        return 'rare'
      case 'Очень редкий':
        return 'rare'
      case 'Условно редкий':
        return 'conditional'
      default:
        return ''
    }
  }

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
        Обращение {data.id}
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
            <li role="presentation">
              <a
                href="#Section5"
                aria-controls="messages"
                role="tab"
                data-toggle="tab"
              >
                Ближайшие объекты
              </a>
            </li>
          </ul>
          <div className="tab-content tabs">
            <div
              role="tabpanel"
              className="tab-pane fade in active show"
              id="Section1"
            >
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Дата пришествия</td>
                    <td>{data.date}</td>
                  </tr>
                  <tr>
                    <td>Координаты</td>
                    <td>
                      Долгота: {data.lon} | Широта: {data.lat}
                    </td>
                  </tr>
                  <tr>
                    <td>Регион</td>
                    <td>{data.region}</td>
                  </tr>
                  <tr>
                    <td>Локация</td>
                    <td>Почва</td>
                  </tr>
                  <tr>
                    <td>Оценка ущерба</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Площадь</td>
                    <td>{data.area} км²</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="Section2">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>{data.oil_pipe.name}</td>
                    <td>
                      Долгота: {data.oil_pipe.lon} | Широта: {data.oil_pipe.lat}
                    </td>
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
                  {Object.entries(data.nature).map((item) => (
                    <tr>
                      <td>{item[0]}</td>
                      <td className={getColorClassName(item[1])}>{item[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="Section5">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Расстояние</th>
                  </tr>
                </thead>
                <tbody>
                  {data.closest_obj.map(({ name, tag, distance }) => (
                    <tr>
                      <td>{name}</td>
                      <td>{Math.ceil(distance * 100) / 100} км</td>
                    </tr>
                  ))}
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
