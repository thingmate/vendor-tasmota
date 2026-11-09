import type { TasmotaZbConfig } from '../tasmota-zb-config.ts';

/**
 * A `ZbConfig` Tasmota command: set the Zigbee configuration of the device.
 */
export interface TasmotaZbConfigRequest {
  /** Configuration to apply: only the provided fields are updated. */
  readonly ZbConfig: Partial<TasmotaZbConfig>;
}
