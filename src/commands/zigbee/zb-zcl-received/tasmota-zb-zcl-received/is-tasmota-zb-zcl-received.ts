import { isObject } from '@xstd/is-type';
import type { TasmotaZbZCLReceived } from './tasmota-zb-zcl-received.ts';

/**
 * Checks whether an input is a `TasmotaZbZCLReceived`.
 *
 * Note: validates the shape of _current_ firmware payloads. Older firmware versions published
 * `clusterid` as a plain number and omitted `frametype`, `direction` and `disableresp`.
 *
 * @param input - The value to check.
 * @returns `true` when the input is a `TasmotaZbZCLReceived`.
 */
export function isTasmotaZbZCLReceived(input: unknown): input is TasmotaZbZCLReceived {
  if (!isObject(input)) {
    return false;
  }

  const received = input as TasmotaZbZCLReceived;

  return (
    typeof received.groupid === 'number' &&
    typeof received.clusterid === 'string' && // hex u16
    typeof received.srcaddr === 'string' && // hex u16
    typeof received.srcendpoint === 'number' &&
    typeof received.dstendpoint === 'number' &&
    is0Or1(received.wasbroadcast) &&
    typeof received.LinkQuality === 'number' &&
    is0Or1(received.securityuse) &&
    typeof received.seqnumber === 'number' &&
    typeof received.fc === 'string' && // hex u8
    is0Or1(received.frametype) &&
    is0Or1(received.direction) &&
    is0Or1(received.disableresp) &&
    typeof received.manuf === 'string' && // hex u16
    typeof received.transact === 'number' &&
    typeof received.cmdid === 'string' && // hex u8
    typeof received.payload === 'string'
  );
}

/**
 * Checks whether a value is a `0` or `1` numeric boolean flag.
 */
function is0Or1(input: unknown): input is 0 | 1 {
  return input === 0 || input === 1;
}
