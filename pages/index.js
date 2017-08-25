
import { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import Layout from '../components/Layout.js'
import Img from '../components/Img'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: false,
    }

    if (typeof window === 'undefined') {
      return
    }

    const setSrc = (src) => {
      this.setState({ src })
    }

    this.socketListeners = {
      save: (obj) => {
        console.log(['save', obj])
      },
      run: (obj) => {
        console.log(['run', obj])
      },
      done: (base64)=>{
        console.log(['done', base64])
        setSrc(`data:image/png;base64,${base64}`)
      }
    }

    Object.keys(this.socketListeners).forEach((k) => {
      window.socket.on(k, this.socketListeners[k])
    })

  }

  componentWillUnmount() {
    Object.keys(this.socketListeners).forEach((k) => {
      window.socket.removeListener(k, this.socketListeners[k])
    })
  }

  render() {
    const {src} = this.state
    return (<div>
      <div className="container">
        <h1>图片处理工具</h1>
        <Row>
          <Col sm={6}>
            <Dropzone
              accept="image/png"
            >
              {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                if (isDragActive) {
                  return "This file is authorized";
                }
                if (isDragReject) {
                  return "This file is not authorized";
                }
                if (acceptedFiles.length) {
                  return (<Img file={acceptedFiles[0]} />)
                }
                if (rejectedFiles.length) {
                  return `rejected ${rejectedFiles.length} files`
                }
                return "Try dropping some files.";
              }}
            </Dropzone>
          </Col>
          <Col sm={6}>
            {src&&(<img src={src} />)}
          </Col>
        </Row>
      </div>
    </div>)
  }
}

export default Layout(Index)