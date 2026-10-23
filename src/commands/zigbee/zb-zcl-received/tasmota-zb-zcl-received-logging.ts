import { isObject } from '@xstd/is-type';
import { type TasmotaZbZCLReceived } from './tasmota-zb-zcl-received.ts';

export interface TasmotaZbZCLReceivedLogging {
  readonly ZbZCLReceived: TasmotaZbZCLReceived;
}

export function isTasmotaZbZCLReceivedLogging(
  input: unknown,
): input is TasmotaZbZCLReceivedLogging {
  return isObject(input) && Reflect.has(input, 'ZbZCLReceived');
}
