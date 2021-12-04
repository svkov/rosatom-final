import axios, { AxiosPromise } from 'axios'
import { autorun, makeAutoObservable } from 'mobx'

export type Data = {
  id: string | number
  date: string
  lat: number
  lon: number
  region: string
  area: number
  company: string
  factory_address: string
  oil_pipe: {
    name: string
    lat: number
    lon: number
  }
  nature: {
    [key: string]: 'Очень редкий' | 'Условно редкий' | 'Редкий'
  }
  closest_obj: {
    distance: number
    name: string | null
    tag: string | null
  }[]
  photo: string[]
}

export default class Store {
  data: Data[] = []

  constructor() {
    makeAutoObservable(this)

    autorun(() => {
      this.getData()
    })
  }

  *getData(): Generator<AxiosPromise<{ data: Data[] }>> {
    const data: any = yield axios('http://37.46.128.70:5000/all')

    // console.log('--- data.data', data.data)

    this.data = data.data
    //   this.data = [
    //     {
    //       id: 1,
    //       date: '2021-12-03',
    //       lat: 58.1234,
    //       lon: 60.8765,
    //       region: 'ХМАО',
    //       area: 14700,
    //       company: 'Лукойл',
    //       factory_address: 'ул. Пушкинская',
    //       oil_pipe: {
    //         name: 'Трубопровод 12-76',
    //         lat: 60.123,
    //         lon: 55.654,
    //       },
    //       nature: {
    //         'Зверобойник брасчатый': 'Редкий',
    //         'Подкобыльник рябристый': 'Условно редкий',
    //       },
    //       closest_obj: [
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 0.043296274708905326,
    //         },
    //         {
    //           name: 'Шайтанка',
    //           tag: null,
    //           distance: 4.075419875688846,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 13.231106447216531,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 15.769736503958551,
    //         },
    //         {
    //           name: 'Нелобка',
    //           tag: null,
    //           distance: 18.378633726444008,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 25.540995496173547,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 32.72816033462218,
    //         },
    //         {
    //           name: 'Пия',
    //           tag: null,
    //           distance: 48.53168330826916,
    //         },
    //         {
    //           name: 'Вилюй',
    //           tag: null,
    //           distance: 50.93113598367231,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 52.89019095952682,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 62.984947529732324,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 63.33048481148751,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 64.80589235572037,
    //         },
    //         {
    //           name: 'Юконка',
    //           tag: null,
    //           distance: 69.43760446695765,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.17344580543161,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.5103748173968,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.52155186697736,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.53597070801665,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.63318070275334,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.69572336534972,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.20172390096447,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.68699114041796,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.05156813351748,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.05375747321452,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.09136208990424,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.11395223987348,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.12798883057421,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.18909587949068,
    //         },
    //         {
    //           name: 'Тура',
    //           tag: null,
    //           distance: 84.8029950576978,
    //         },
    //         {
    //           name: 'Пуреговка',
    //           tag: null,
    //           distance: 84.87900514291314,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.27014391757041,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.69404198760913,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 85.70723215667184,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.0522591150051,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.06311819264896,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.10619042417635,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13250133223711,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13305794378546,
    //         },
    //         {
    //           name: 'пруд Шуралинский',
    //           tag: null,
    //           distance: 86.15233910801226,
    //         },
    //         {
    //           name: 'Большая Белая',
    //           tag: null,
    //           distance: 101.00338359721538,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 102.58820341436459,
    //         },
    //         {
    //           name: 'Казанка',
    //           tag: null,
    //           distance: 106.66662779902042,
    //         },
    //         {
    //           name: 'Молва',
    //           tag: null,
    //           distance: 108.88506587238645,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 109.83015595677338,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 121.04466077335375,
    //         },
    //         {
    //           name: 'Черный шишим',
    //           tag: null,
    //           distance: 121.22979890669572,
    //         },
    //         {
    //           name: 'Карабай',
    //           tag: null,
    //           distance: 121.60018545040839,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 123.61315104068866,
    //         },
    //         {
    //           name: 'Сосьва',
    //           tag: null,
    //           distance: 125.85737600173013,
    //         },
    //       ],
    //       photo: [],
    //     },
    //     {
    //       id: 1,
    //       date: '2021-12-03',
    //       lat: 58.1234,
    //       lon: 60.8765,
    //       region: 'ХМАО',
    //       area: 14700,
    //       company: 'Лукойл',
    //       factory_address: 'ул. Пушкинская',
    //       oil_pipe: {
    //         name: 'Трубопровод 12-76',
    //         lat: 60.123,
    //         lon: 55.654,
    //       },
    //       nature: {
    //         'Зверобойник брасчатый': 'Редкий',
    //         'Подкобыльник рябристый': 'Условно редкий',
    //       },
    //       closest_obj: [
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 0.043296274708905326,
    //         },
    //         {
    //           name: 'Шайтанка',
    //           tag: null,
    //           distance: 4.075419875688846,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 13.231106447216531,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 15.769736503958551,
    //         },
    //         {
    //           name: 'Нелобка',
    //           tag: null,
    //           distance: 18.378633726444008,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 25.540995496173547,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 32.72816033462218,
    //         },
    //         {
    //           name: 'Пия',
    //           tag: null,
    //           distance: 48.53168330826916,
    //         },
    //         {
    //           name: 'Вилюй',
    //           tag: null,
    //           distance: 50.93113598367231,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 52.89019095952682,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 62.984947529732324,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 63.33048481148751,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 64.80589235572037,
    //         },
    //         {
    //           name: 'Юконка',
    //           tag: null,
    //           distance: 69.43760446695765,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.17344580543161,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.5103748173968,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.52155186697736,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.53597070801665,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.63318070275334,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.69572336534972,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.20172390096447,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.68699114041796,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.05156813351748,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.05375747321452,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.09136208990424,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.11395223987348,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.12798883057421,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.18909587949068,
    //         },
    //         {
    //           name: 'Тура',
    //           tag: null,
    //           distance: 84.8029950576978,
    //         },
    //         {
    //           name: 'Пуреговка',
    //           tag: null,
    //           distance: 84.87900514291314,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.27014391757041,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.69404198760913,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 85.70723215667184,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.0522591150051,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.06311819264896,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.10619042417635,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13250133223711,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13305794378546,
    //         },
    //         {
    //           name: 'пруд Шуралинский',
    //           tag: null,
    //           distance: 86.15233910801226,
    //         },
    //         {
    //           name: 'Большая Белая',
    //           tag: null,
    //           distance: 101.00338359721538,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 102.58820341436459,
    //         },
    //         {
    //           name: 'Казанка',
    //           tag: null,
    //           distance: 106.66662779902042,
    //         },
    //         {
    //           name: 'Молва',
    //           tag: null,
    //           distance: 108.88506587238645,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 109.83015595677338,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 121.04466077335375,
    //         },
    //         {
    //           name: 'Черный шишим',
    //           tag: null,
    //           distance: 121.22979890669572,
    //         },
    //         {
    //           name: 'Карабай',
    //           tag: null,
    //           distance: 121.60018545040839,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 123.61315104068866,
    //         },
    //         {
    //           name: 'Сосьва',
    //           tag: null,
    //           distance: 125.85737600173013,
    //         },
    //       ],
    //       photo: [],
    //     },
    //   ]
    // } catch (_) {
    //   this.data = [
    //     {
    //       id: 1,
    //       date: '2021-12-03',
    //       lat: 58.1234,
    //       lon: 60.8765,
    //       region: 'ХМАО',
    //       area: 14700,
    //       company: 'Лукойл',
    //       factory_address: 'ул. Пушкинская',
    //       oil_pipe: {
    //         name: 'Трубопровод 12-76',
    //         lat: 60.123,
    //         lon: 55.654,
    //       },
    //       nature: {
    //         'Зверобойник брасчатый': 'Редкий',
    //         'Подкобыльник рябристый': 'Условно редкий',
    //       },
    //       closest_obj: [
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 0.043296274708905326,
    //         },
    //         {
    //           name: 'Шайтанка',
    //           tag: null,
    //           distance: 4.075419875688846,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 13.231106447216531,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 15.769736503958551,
    //         },
    //         {
    //           name: 'Нелобка',
    //           tag: null,
    //           distance: 18.378633726444008,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 25.540995496173547,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 32.72816033462218,
    //         },
    //         {
    //           name: 'Пия',
    //           tag: null,
    //           distance: 48.53168330826916,
    //         },
    //         {
    //           name: 'Вилюй',
    //           tag: null,
    //           distance: 50.93113598367231,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 52.89019095952682,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 62.984947529732324,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 63.33048481148751,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 64.80589235572037,
    //         },
    //         {
    //           name: 'Юконка',
    //           tag: null,
    //           distance: 69.43760446695765,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.17344580543161,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.5103748173968,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.52155186697736,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.53597070801665,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.63318070275334,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.69572336534972,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.20172390096447,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.68699114041796,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.05156813351748,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.05375747321452,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.09136208990424,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.11395223987348,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.12798883057421,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.18909587949068,
    //         },
    //         {
    //           name: 'Тура',
    //           tag: null,
    //           distance: 84.8029950576978,
    //         },
    //         {
    //           name: 'Пуреговка',
    //           tag: null,
    //           distance: 84.87900514291314,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.27014391757041,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.69404198760913,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 85.70723215667184,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.0522591150051,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.06311819264896,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.10619042417635,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13250133223711,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13305794378546,
    //         },
    //         {
    //           name: 'пруд Шуралинский',
    //           tag: null,
    //           distance: 86.15233910801226,
    //         },
    //         {
    //           name: 'Большая Белая',
    //           tag: null,
    //           distance: 101.00338359721538,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 102.58820341436459,
    //         },
    //         {
    //           name: 'Казанка',
    //           tag: null,
    //           distance: 106.66662779902042,
    //         },
    //         {
    //           name: 'Молва',
    //           tag: null,
    //           distance: 108.88506587238645,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 109.83015595677338,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 121.04466077335375,
    //         },
    //         {
    //           name: 'Черный шишим',
    //           tag: null,
    //           distance: 121.22979890669572,
    //         },
    //         {
    //           name: 'Карабай',
    //           tag: null,
    //           distance: 121.60018545040839,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 123.61315104068866,
    //         },
    //         {
    //           name: 'Сосьва',
    //           tag: null,
    //           distance: 125.85737600173013,
    //         },
    //       ],
    //       photo: [],
    //     },
    //     {
    //       id: 1,
    //       date: '2021-12-03',
    //       lat: 58.1234,
    //       lon: 60.8765,
    //       region: 'ХМАО',
    //       area: 14700,
    //       company: 'Лукойл',
    //       factory_address: 'ул. Пушкинская',
    //       oil_pipe: {
    //         name: 'Трубопровод 12-76',
    //         lat: 60.123,
    //         lon: 55.654,
    //       },
    //       nature: {
    //         'Зверобойник брасчатый': 'Редкий',
    //         'Подкобыльник рябристый': 'Условно редкий',
    //       },
    //       closest_obj: [
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 0.043296274708905326,
    //         },
    //         {
    //           name: 'Шайтанка',
    //           tag: null,
    //           distance: 4.075419875688846,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 13.231106447216531,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 15.769736503958551,
    //         },
    //         {
    //           name: 'Нелобка',
    //           tag: null,
    //           distance: 18.378633726444008,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 25.540995496173547,
    //         },
    //         {
    //           name: 'Салда',
    //           tag: null,
    //           distance: 32.72816033462218,
    //         },
    //         {
    //           name: 'Пия',
    //           tag: null,
    //           distance: 48.53168330826916,
    //         },
    //         {
    //           name: 'Вилюй',
    //           tag: null,
    //           distance: 50.93113598367231,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 52.89019095952682,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 62.984947529732324,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 63.33048481148751,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 64.80589235572037,
    //         },
    //         {
    //           name: 'Юконка',
    //           tag: null,
    //           distance: 69.43760446695765,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.17344580543161,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.5103748173968,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 77.52155186697736,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.53597070801665,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.63318070275334,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 77.69572336534972,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.20172390096447,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 78.68699114041796,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.05156813351748,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.05375747321452,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.09136208990424,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.11395223987348,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 80.12798883057421,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 80.18909587949068,
    //         },
    //         {
    //           name: 'Тура',
    //           tag: null,
    //           distance: 84.8029950576978,
    //         },
    //         {
    //           name: 'Пуреговка',
    //           tag: null,
    //           distance: 84.87900514291314,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.27014391757041,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 85.69404198760913,
    //         },
    //         {
    //           name: 'Нейва',
    //           tag: null,
    //           distance: 85.70723215667184,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.0522591150051,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.06311819264896,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.10619042417635,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13250133223711,
    //         },
    //         {
    //           name: 'Северная Шуралка',
    //           tag: null,
    //           distance: 86.13305794378546,
    //         },
    //         {
    //           name: 'пруд Шуралинский',
    //           tag: null,
    //           distance: 86.15233910801226,
    //         },
    //         {
    //           name: 'Большая Белая',
    //           tag: null,
    //           distance: 101.00338359721538,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 102.58820341436459,
    //         },
    //         {
    //           name: 'Казанка',
    //           tag: null,
    //           distance: 106.66662779902042,
    //         },
    //         {
    //           name: 'Молва',
    //           tag: null,
    //           distance: 108.88506587238645,
    //         },
    //         {
    //           name: 'Тагил',
    //           tag: null,
    //           distance: 109.83015595677338,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 121.04466077335375,
    //         },
    //         {
    //           name: 'Черный шишим',
    //           tag: null,
    //           distance: 121.22979890669572,
    //         },
    //         {
    //           name: 'Карабай',
    //           tag: null,
    //           distance: 121.60018545040839,
    //         },
    //         {
    //           name: null,
    //           tag: null,
    //           distance: 123.61315104068866,
    //         },
    //         {
    //           name: 'Сосьва',
    //           tag: null,
    //           distance: 125.85737600173013,
    //         },
    //       ],
    //       photo: [],
    //     },
    // ]
  }
}
