/**
 * The Zigbee network configuration of a Tasmota device, as returned by the `ZbConfig` command.
 */
export interface TasmotaZbConfig {
  /** Zigbee radio channel of the network (`11-26`). */
  readonly Channel: number;
  /** PAN id of the Zigbee network (hex u16, ex: `'0x1A63'`). */
  readonly PanID: string;
  /** Extended PAN id of the Zigbee network (hex u64, ex: `'0x0123456789ABCDEF'`). */
  readonly ExtPanID: string;
  /** Low half of the Zigbee network key (hex u64). */
  readonly KeyL: string;
  /** High half of the Zigbee network key (hex u64). */
  readonly KeyH: string;
  /** Zigbee radio transmit power (`1-21`). */
  readonly TxRadio: number;
}
