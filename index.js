var scope = require('scoped-transform-stream')
var segment = require('pipe-segment')

module.exports = ScopeCodec

function ScopeCodec(codec, path) {
  if (!(codec.encode && codec.decode))
    throw new Error('scope requires the transform codec interface.')

  var enc = scope(codec.encode, path)
  var dec = scope(codec.decode, path)

  var o = {objectMode: true, highWaterMark: 16}
  return segment({
    encode: enc,
    decode: dec,
    encodeErrors: codec.encodeErrors,
    decodeErrors: codec.decodeErrors,
  })
}
