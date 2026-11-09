import type { TasmotaZbConfig } from '../tasmota-zb-config.ts';

/**
 * Response of the `ZbConfig` Tasmota command.
 */
export interface TasmotaZbConfigResponse {
  /** Zigbee configuration of the device. */
  readonly ZbConfig: TasmotaZbConfig;
}
