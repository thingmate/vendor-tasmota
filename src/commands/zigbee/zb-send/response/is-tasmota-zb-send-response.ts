import { isObject } from '@xstd/is-type';
import { type TasmotaZbSendResponse } from './tasmota-zb-send-response.ts';

export function isTasmotaZbSendResponse(input: unknown): input is TasmotaZbSendResponse {
  return isObject(input) && Reflect.has(input, 'ZbSend');
}
