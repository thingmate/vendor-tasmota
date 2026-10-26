import { isObject } from '@xstd/is-type';
import { type TasmotaZbSendResponse } from './tasmota-zb-send-response.ts';

/**
 * Checks whether an input is a `TasmotaZbSendResponse` (a successful `ZbSend` response).
 *
 * @param input - The value to check.
 * @returns `true` when the input is a `TasmotaZbSendResponse`.
 */
export function isTasmotaZbSendResponse(input: unknown): input is TasmotaZbSendResponse {
  return isObject(input) && (input as { ZbSend?: unknown }).ZbSend === 'Done';
}
