import React, { useState, useCallback } from 'react'
import Gallery from 'react-photo-gallery'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { photos } from './photos'
import { Data } from '../../store'
import './index.css'

type Props = {
  data: Data
}

function Base64Decode(str: string) {
  if (!/^[a-z0-9+/]+={0,2}$/i.test(str) || str.length % 4 != 0)
    throw Error('Not base64 string')

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    d = []

  for (var c = 0; c < str.length; c += 4) {
    // unpack four hexets into three octets
    h1 = b64.indexOf(str.charAt(c))
    h2 = b64.indexOf(str.charAt(c + 1))
    h3 = b64.indexOf(str.charAt(c + 2))
    h4 = b64.indexOf(str.charAt(c + 3))

    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4

    o1 = (bits >>> 16) & 0xff
    o2 = (bits >>> 8) & 0xff
    o3 = bits & 0xff

    d[c / 4] = String.fromCharCode(o1, o2, o3)
    // check for padding
    if (h4 == 0x40) d[c / 4] = String.fromCharCode(o1, o2)
    if (h3 == 0x40) d[c / 4] = String.fromCharCode(o1)
  }
  str = d.join('') // use Array.join() for better performance than repeated string appends

  return str
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
                href={`#Section1${data.id}`}
                aria-controls="home"
                role="tab"
                data-toggle="tab"
              >
                Данные о разливе
              </a>
            </li>
            <li role="presentation">
              <a
                href={`#Section2${data.id}`}
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
              >
                Предприятия
              </a>
            </li>
            <li role="presentation">
              <a
                href={`#Section3${data.id}`}
                aria-controls="messages"
                role="tab"
                data-toggle="tab"
              >
                Фото
              </a>
            </li>
            <li role="presentation">
              <a
                href={`#Section4${data.id}`}
                aria-controls="messages"
                role="tab"
                data-toggle="tab"
              >
                Флора и фауна
              </a>
            </li>
            <li role="presentation">
              <a
                href={`#Section5${data.id}`}
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
              id={`Section1${data.id}`}
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
            <div
              role="tabpanel"
              className="tab-pane fade"
              id={`Section2${data.id}`}
            >
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
            <div
              role="tabpanel"
              className="tab-pane fade"
              id={`Section3${data.id}`}
            >
              <div>
                <Carousel>
                  <div>
                    <div>
                      <img src="https://cdn-zttim.storage.yandexcloud.net/uploads/2021/09/e1lwrbvx0aevgkv-1024x576.jpg" />
                    </div>
                    <img
                      // src={`data:image/jpg;base64,${Base64Decode(data.photo)}`}
                      src={`data:image/jpeg;base64,${data.photo}`}
                    />
                  </div>
                  <div>
                    <img
                      // src={`data:image/jpg;base64,${Base64Decode(data.photo)}`}
                      src={`data:image/jpg;base64,${data.photo}`}
                    />
                  </div>
                </Carousel>
              </div>
            </div>
            <div
              role="tabpanel"
              className="tab-pane fade"
              id={`Section4${data.id}`}
            >
              <table className="table table-borderless">
                <tbody>
                  {Object.entries(data.nature).map((item, i) => (
                    <tr key={item[0] + i}>
                      <td>{item[0]}</td>
                      <td className={getColorClassName(item[1])}>{item[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              role="tabpanel"
              className="tab-pane fade"
              id={`Section5${data.id}`}
            >
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Расстояние</th>
                  </tr>
                </thead>
                <tbody>
                  {data.closest_obj.map(({ name, tag, distance }, i) => (
                    <tr key={name || '' + distance + 1}>
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
