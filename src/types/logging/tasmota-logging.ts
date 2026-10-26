import { type TasmotaLoggingTime } from './tasmota-logging-time.ts';

/**
 * A Tasmota log line, as published to `stat/<device>/LOGGING`.
 */
export interface TasmotaLogging {
  /** Time at which the line was logged. */
  readonly time: TasmotaLoggingTime;
  /** Category of the line (ex: `ZIG`, `MQT`, `CFG`). */
  readonly code: string;
  /** Content of the line, without its code prefix. */
  readonly message: string;
}
