
import { Component } from 'react'

import Layout from '../../components/LayoutBlank.js'
import ImgFilter from '../../components/ImgFilter'

class Index extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (<div>
      <div className="container">
        <h1>图形处理工具</h1>
        <ImgFilter
          cmd="thresh_test"
          inputPrifix="-i "
          outputPrifix="-o "
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