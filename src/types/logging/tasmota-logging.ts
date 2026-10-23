import { type TasmotaLoggingTime } from './tasmota-logging-time.ts';

export interface TasmotaLogging {
  readonly time: TasmotaLoggingTime;
  readonly code: string;
  readonly message: string;
}
