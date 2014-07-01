var codec = require('pipe-segment-codec')
var scope = require('./')

var jsonc = codec(encode, decode)
function encode(data) {
  return JSON.stringify(data)
}

function decode(data) {
  return JSON.parse(data)
}

var scoped = scope(jsonc, '/msg')
scoped.decodeErrors.on('data', console.log)
scoped.encodeErrors.on('data', console.log)

scoped.encoded.on('data', console.log)
scoped.decoded.write({msg: {hello: "world"} }) // {msg: '{"hello":"world"}'}
scoped.decoded.write({msg: {beep: "boop"}, context: [] }) // {msg: '{"beep":"boop"}', context: [] }

scoped.decoded.on('data', console.log)
scoped.encoded.write({msg: '{"hello":"world"}' }) // {msg: {hello: "world"} }
scoped.encoded.write({msg: '{"beep":"boop"}', context: [] }) // {msg: {beep: "boop"}, context: [] }
