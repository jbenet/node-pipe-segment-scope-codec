var scope = require('scoped-transform-stream')
var segment = require('pipe-segment')
var duplexer2 = require('duplexer2.jbenet')

module.exports = ScopeCodec

function ScopeCodec(codec, path) {
  var enc = scope(codec.encode, path)
  var dec = scope(codec.decode, path)

  var o = {objectMode: true, highWaterMark: 16}
  return segment({
    encoded: duplexer2(o, dec, enc),
    decoded: duplexer2(o, enc, dec),
    encodeErrors: codec.encodeErrors,
    decodeErrors: codec.decodeErrors,
  })
}
