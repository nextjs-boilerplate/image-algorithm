import React from 'react'
import Head from 'next/head'

import wrapper from '../tools/wrapper'



const layout = (Page) => wrapper(class Layout extends React.Component {
  render() {
    return (<div >
      <Head>
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/io.js"></script>
      </Head>
      <Page {...this.props} />
    </div>)
  }
  static translateNS = [ ...Page.translateNS || []]
  static getInitialProps = async (ctx) => {
    return await Promise.all([
      Page.getInitialProps ? Page.getInitialProps(ctx) : Promise.resolve(true),
    ])
  }
})

export default layout