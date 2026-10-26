import { type TasmotaZbZCLReceived } from '../tasmota-zb-zcl-received/tasmota-zb-zcl-received.ts';

/**
 * A `ZbZCLReceived` Tasmota logging message: a received Zigbee ZCL frame.
 */
export interface TasmotaZbZCLReceivedLogging {
  readonly ZbZCLReceived: TasmotaZbZCLReceived;
}
