var codec = require('pipe-segment-codec')
var scope = require('./')

var jsonc = codec.transform(encode, decode)
function encode(data) {
  return JSON.stringify(data)
}

function decode(data) {
  return JSON.parse(data)
}

var scoped = scope(jsonc, '/msg')
scoped.decodeErrors.on('data', console.log)
scoped.encodeErrors.on('data', console.log)

scoped.decode.on('data', console.log)
scoped.encode.write({msg: {hello: "world"} }) // {msg: '{"hello":"world"}'}
scoped.encode.write({msg: {beep: "boop"}, context: [] }) // {msg: '{"beep":"boop"}', context: [] }

scoped.encode.on('data', console.log)
scoped.decode.write({msg: '{"hello":"world"}' }) // {msg: {hello: "world"} }
scoped.decode.write({msg: '{"beep":"boop"}', context: [] }) // {msg: {beep: "boop"}, context: [] }
