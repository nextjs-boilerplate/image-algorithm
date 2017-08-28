import { Component } from 'react'

class Img extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: false,
      file: false,
    }
    const reader = new FileReader();
    this.reader = reader
    this.readerListenner = () => {
      this.setState({
        src: reader.result
      })
      props.setCurrent(reader.result)
    }
    reader.addEventListener("load", this.readerListenner, false);
    this.updateSrc(props)
  }

  componentWillReceiveProps(props) {
    this.updateSrc(props)
  }

  componentWillUnmount() {
    this.reader.removeEventListener("load", this.readerListenner)
    delete this.reader
  }

  updateSrc({ file }) {
    setTimeout(() => {
      if (!file) {
        return
      }
      if (file === this.state.file) {
        return
      }
      this.setState({
        file,
      })
      this.reader.readAsDataURL(file)
    })
  }

  render() {
    const { src } = this.state
    if (!src) {
      return (<span> 拖拽或点击此处上传图片</span>)
    }
    return (<img style={{
      maxHeight: 190,
      maxWidth: 190,
    }} src={src} />)
  }

}

export default Img