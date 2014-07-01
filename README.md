# pipe-segment-scope-codec

Scope the work of a [pipe-segment-codec](https://github.com/jbenet/node-pipe-segment-codec), using [scoped-transform-stream](https://github.com/jbenet/node-scoped-transform-stream).

```
npm install pipe-segment-scope-codec
```

## Example

```js
var codec = require('pipe-segment-codec')
var scope = require('pipe-segment-scope-codec')

var jsonc = codec(encode, decode)

var scoped = scope(codec, '/msg/payload')
scoped.on('data', console.log)
scoped.write({msg: {hello: "world"} }) // {msg: '{"hello":"world"}'}
scoped.write({msg: {beep: "boop"}, context: [] }) // {msg: '{"beep":"boop"}', context: [] }

function encode(data) {
  return JSON.strigify(data)
}

function decode(data) {
  return JSON.parse(data)
}
```
