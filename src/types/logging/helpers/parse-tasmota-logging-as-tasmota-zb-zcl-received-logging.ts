import { isTasmotaZbZCLReceivedLogging } from '../../../commands/zigbee/zb-zcl-received/tasmota-zb-zcl-received-logging/is-tasmota-zb-zcl-received-logging.ts';
import { type TasmotaZbZCLReceivedLogging } from '../../../commands/zigbee/zb-zcl-received/tasmota-zb-zcl-received-logging/tasmota-zb-zcl-received-logging.ts';
import type { TasmotaLogging } from '../tasmota-logging.ts';

/**
 * Attempts to parse the `code` and `message` of a `TasmotaLogging` as a
 * `TasmotaZbZCLReceivedLogging`.
 *
 * @param logging - The `code` and `message` of a `TasmotaLogging`.
 * @returns The parsed `TasmotaZbZCLReceivedLogging`, or `null` when the logging is not a received
 *          Zigbee ZCL frame.
 */
export function parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging({
  code,
  message,
}: Pick<TasmotaLogging, 'code' | 'message'>): TasmotaZbZCLReceivedLogging | null {
  if (code === 'ZIG') {
    try {
      const data: unknown = JSON.parse(message);

      if (isTasmotaZbZCLReceivedLogging(data)) {
        return data;
      }
    } catch (error: unknown) {
      if (!(error instanceof SyntaxError)) {
        throw error;
      }
    }
  }

  return null;
}
