
import { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import Img from '../components/Img'

export default class ImgFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: false,
      current: false,
      params: props.params,
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
      done: (base64) => {
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

  dealUpdate() {
    const { cmd, inputPrifix, outputPrifix } = this.props
    console.log('dealUpdate')
    const { current, params } = this.state
    if (!current) {
      console.log('if (!current)')
      return
    }

    window.socket.emit('file', {
      cmd,
      base64: current,
      params: params.map(({ name, value }) => `${name}=${value}`),
      inputPrifix,
      outputPrifix,
    })
  }

  render() {
    const { src, params, } = this.state

    const setCurrent = (current) => {
      if (current != this.state.current) {
        this.setState({ current })
        this.dealUpdate()
      }
    }

    const onChange = (i, value) => {
      const { params = [] } = this.state
      params[i].value = value
      this.setState({ params: params.concat([]) })
      this.dealUpdate()
    }

    return (<div>
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
                return (<Img file={acceptedFiles[0]} setCurrent={setCurrent} />)
              }
              if (rejectedFiles.length) {
                return `rejected ${rejectedFiles.length} files`
              }
              return "Try dropping some files.";
            }}
          </Dropzone>
        </Col>
        <Col sm={6}>
          {src && (<img src={src} style={{
            maxWidth: 200,
            maxHeight: 200,
          }} />)}
        </Col>
      </Row>
      <hr />
      <Row>
        {params.map(({ title, value, input }, i) => (<Col key={i} sm={6}>
          <div className="form-group">
            <label>{title}</label>
            <input
              className="form-control"
              {...input}
              value={value}
              onChange={(e) => onChange(i, e.target.value)} />
          </div>
        </Col>))}

      </Row>
    </div>)
  }
}