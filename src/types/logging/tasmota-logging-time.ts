/**
 * A time of day, as displayed in Tasmota log lines.
 */
export interface TasmotaLoggingTime {
  /** Hours (0-23). */
  readonly hour: number;
  /** Minutes (0-59). */
  readonly minute: number;
  /** Seconds (0-59). */
  readonly second: number;
  /** `0` when the log line has no millisecond part (older firmware versions). */
  readonly millisecond: number;
}
