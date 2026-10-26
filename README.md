[![npm (scoped)](https://img.shields.io/npm/v/@thingmate/vendor-tasmota.svg)](https://www.npmjs.com/package/@thingmate/vendor-tasmota)
![npm](https://img.shields.io/npm/dm/@thingmate/vendor-tasmota.svg)
![NPM](https://img.shields.io/npm/l/@thingmate/vendor-tasmota.svg)
![npm type definitions](https://img.shields.io/npm/types/@thingmate/vendor-tasmota.svg)
![AI generation](https://img.shields.io/badge/AI_generation-none-yellow)

<picture>
  <source height="64" media="(prefers-color-scheme: dark)" srcset="https://github.com/thingmate/website/blob/main/assets/logo/png/logo-large-dark.png?raw=true">
  <source height="64" media="(prefers-color-scheme: light)" srcset="https://github.com/thingmate/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
  <img height="64" alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://github.com/thingmate/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
</picture>

## @thingmate/vendor-tasmota

Tasmota API.

## 📦 Installation

```shell
yarn add @thingmate/vendor-tasmota
# or
npm install @thingmate/vendor-tasmota --save
```

## 📜 Documentation

This package provides an API to control [Tasmota](https://tasmota.github.io/) devices over
[MQTT](https://tasmota.github.io/docs/MQTT/), with a focus on Zigbee-capable devices.

- [`MqttTasmotaCli`](#mqtttasmotacli) - send commands to a Tasmota device and observe its logs.
- [`Other utilities`](#other-utilities) - parse the observed log lines and Zigbee messages.

### MqttTasmotaCli

`MqttTasmotaCli` binds a Tasmota device to an MQTT resource and provides two abilities:

| Ability   | Description                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `send`    | Publishes a JSON command payload to `cmnd/<deviceId>/json` (Tasmota's [Json](https://tasmota.github.io/docs/Commands/#json) command). |
| `observe` | Emits every log line published by the device to `stat/<deviceId>/LOGGING`, decoded as a `string`.                                     |

> [!NOTE]
> The device only publishes its log lines when its `MqttLog` level is greater than `0` (`0` is the
> default). Enable it on the device with `MqttLog 2` (errors and info).

#### Creating a client

```ts
import { MqttResource } from '@xstd/mqtt-resource';
import { MqttTasmotaCli } from '@thingmate/vendor-tasmota';

// connect to the MQTT broker the Tasmota device is connected to
const mqtt: MqttResource = await MqttResource.open('mqtt://192.168.1.10:1883', {
  username: 'user',
  password: 'password',
});

const tasmota = new MqttTasmotaCli({
  mqtt,
  deviceId: 'tasmota_XXXXXX', // the device's MQTT topic
});
```

`MqttResource` comes from the
[`@xstd/mqtt-resource`](https://www.npmjs.com/package/@xstd/mqtt-resource) package (installed
alongside this one). Any implementation of the `MqttResourceTrait` interface may be used instead.

#### Sending commands

Every call is abortable through an `AbortSignal`:

```ts
const controller: AbortController = new AbortController();

// publishes the payload to `cmnd/tasmota_XXXXXX/json`
await tasmota.send.call(controller.signal, '{"ZbSend":{"Device":"0x1234","Send":{"Power":1}}}');
```

The payload is sent as a `string` and must be a JSON object of Tasmota commands. The
`TasmotaZbSendCommand` type describes the shape of a `ZbSend` payload.

#### Observing log lines

The `observe` property is an observable async function emitting the device's log lines, one per
MQTT message received on `stat/<deviceId>/LOGGING`:

```ts
const controller: AbortController = new AbortController();

// resolves with the next log line published by the device
const [line]: readonly [string] = await tasmota.observe.first(controller.signal);
console.log(line); // ex: '12:34:56.789 MQT: stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}'

// or iterate over every log line, as they are published
for await (const [line] of tasmota.observe.values(controller.signal)) {
  console.log(line);
  if (line.includes('Malformed')) {
    break; // closes the underlying MQTT subscription
  }
}
```

> [!IMPORTANT]
> The observed stream contains _all_ the device's log lines - including the echo of the commands
> sent to it, and unrelated logs (Wi-Fi, telemetry, ...). Tasmota provides no correlation id, so
> an observed line cannot be matched to a specific sent command: filter the lines according to
> your needs.

> [!TIP]
> Establish the observation (`first`, `values` or `forEach`) _before_ sending a command, else the
> lines published in between may be missed.

More consumption patterns (like `forEach`) are available on the `ObservableAsyncFunction` type
returned by `observe`, from the
[`@xstd/observable-async-function`](https://www.npmjs.com/package/@xstd/observable-async-function)
package.

### Other utilities

Helpers to process the lines emitted by `MqttTasmotaCli.observe`:

```ts
import {
  parseTasmotaLogging,
  parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging,
} from '@thingmate/vendor-tasmota';

const logging = parseTasmotaLogging('12:34:56.789 ZIG: {"ZbZCLReceived":{}}');
// => { time: { hour: 12, minute: 34, second: 56, millisecond: 789 }, code: 'ZIG', message: '...' }

const received = parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging(logging);
// => { ZbZCLReceived: { srcaddr: '0x1234', payload: '...', ... } } or `null`
```

- `parseTasmotaLogging(line)` - parses a log line (with or without milliseconds) into a
  `TasmotaLogging` (`{ time, code, message }`); throws when the line is malformed.
- `parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging(logging)` - extracts the received Zigbee ZCL
  frame from a `ZIG` log line, or returns `null`.
- `isTasmotaZbSendResponse(value)` - type guard checking for a successful `ZbSend` response
  (`{ ZbSend: 'Done' }`).
- `TasmotaZbSendCommand` - the shape of a `ZbSend` command payload.
