
import { Component } from 'react'

import Layout from '../components/Layout.js'
import ImgFilter from '../components/ImgFilter'

class Index extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (<div>
      <div className="container">
        <h1>图片处理工具</h1>
        <ImgFilter
          cmd="thresh_test"
          params={[
            {
              title: '阈值',
              name: '-t',
              value: 127,
              input: {
                type: 'range',
                min: 0,
                max: 255,
                step: 1,
              },
            }
          ]}
        />
      </div>
    </div>)
  }
}

export default Layout(Index)