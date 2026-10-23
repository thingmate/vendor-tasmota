import {
  isTasmotaZbZCLReceivedLogging,
  type TasmotaZbZCLReceivedLogging,
} from '../../../commands/zigbee/zb-zcl-received/tasmota-zb-zcl-received-logging.ts';
import type { TasmotaLogging } from '../tasmota-logging.ts';

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
    } catch {}
  }

  return null;
}
