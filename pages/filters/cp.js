
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
        <h1>拷贝模拟</h1>
        <ImgFilter
          cmd="cp"
          inputPrifix=""
          outputPrifix=""
        />
      </div>
    </div>)
  }
}

export default Layout(Index)