import os from 'os'
import path from 'path'
import { exec } from 'child_process'

import fs from 'fs-extra'
import uuid from 'node-uuid'
import Promise from 'bluebird'
import { encode, decode } from 'node-base64-image'
import uri2buffer from 'data-uri-to-buffer'

const tmpDir = os.tmpdir()

export default (cmd, base64, params = [], send, inputPrifix, outputPrifix) => {
  //定名
  const inputFileName = uuid(), outputFileName = uuid()
  const inputFilePath = path.join(tmpDir, `${inputFileName}`)
  const outputFilePath = path.join(tmpDir, `${outputFileName}.jpg`)
  const cmdPath = path.join(__dirname, '..', 'bin', path.basename(cmd))

  if(!checkPrifix(inputPrifix) || !checkPrifix(outputPrifix)){
    send('save', 'bad prifix')
    return Promise.reject('bad prifix')
  }

  //存输入图片
  return Promise.promisify(decode)(uri2buffer(base64), { filename: inputFilePath })
    .then((obj) => {
      send('save', obj)
      //运行算法
      const command = `${cmdPath} ${inputPrifix}${inputFilePath}.jpg ${outputPrifix}${outputFilePath}` + (params.length ? ' ' + params.join(' ') : '')
      console.log({ command })
      return Promise.promisify(exec)(command, {})
    })
    .then((obj) => {
      send('run', obj)
      //获取内容      
      return Promise.promisify(encode)(outputFilePath, { string: true, local: true, })
    })
    .then((result) => {
      fs.remove(`${inputFilePath}.jpg`)
      fs.remove(outputFilePath)
      return result
    })
}

function checkPrifix(str){
  if(!str) {
    return true
  }
  return /^[\w-= ]+$/.test(str)
}