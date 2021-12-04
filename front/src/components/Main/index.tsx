import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../StoreContext'
import Content from '../Content'

const Main: React.FC = observer(() => {
  const store = useStore()

  console.log('--- store?.data?.map', !!store?.data[0])

  return (
    <>
      {store?.data?.map((item) => (
        <div>
          <Content key={item.id} data={item} />
          <br />
          <br />
        </div>
      ))}
    </>
  )
})

export default Main
