export interface TasmotaZbSendCommand {
  readonly Device: string /* u16 hex - ex: '0x1234' */;
  readonly Endpoint?: string /* u16 hex - ex: '0x1234' */ | number /* u16 */;
  readonly Cluster?: string /* u16 hex - ex: '0x1234' */ | number /* u16 */;
  /**
   * Represents a "low-level" _send_ command.
   * It has the following syntax: `<cluster>(_|!)<cmd>/<bytes>`
   * @inheritDoc: https://tasmota.github.io/docs/Zigbee/#low-level-commands
   */
  readonly Send?: string | TasmotaZbSendCommandSendObject;
  readonly Read?: number | string | readonly [string] | TasmotaZbSendCommandReadObject;
  readonly Write?: TasmotaZbSendCommandWriteObject;
}

export type TasmotaZbSendCommandSendObject = Record<string, string | number | boolean>;
export type TasmotaZbSendCommandReadObject = Record<string, string | number | boolean>;
export type TasmotaZbSendCommandWriteObject = Record<string, string | number | boolean>;
