/**
 * A `ZbSend` Tasmota command: read, write or send Zigbee attributes and commands to a target
 * device.
 */
export interface TasmotaZbSendCommand {
  /** Target device: short address (hex u16, ex: `'0x1234'`), long address or friendly name. */
  readonly Device: string;
  /** Endpoint of the target device, as a hex string (ex: `'0x03'`) or a number (u8, `1-240`). */
  readonly Endpoint?: string | number;
  /** Cluster the command applies to, as a hex string (ex: `'0x1234'`) or a number (u16). */
  readonly Cluster?: string | number;
  /**
   * Represents a "low-level" _send_ command.
   * It has the following syntax: `<cluster>(_|!)<cmd>/<bytes>`
   * @see https://tasmota.github.io/docs/Zigbee/#low-level-commands
   */
  readonly Send?: string | TasmotaZbSendCommandSendObject;
  /**
   * Attributes to read: attribute id (number), hex string (ex: `'0x0000'`), list of attributes, or
   * named attributes.
   */
  readonly Read?: number | string | readonly (string | number)[] | TasmotaZbSendCommandReadObject;
  /** Attributes to write, mapped to their new value. */
  readonly Write?: TasmotaZbSendCommandWriteObject;
}

/**
 * Attributes or commands to send, mapped to their value (ex: `{ Power: 1 }`).
 */
export type TasmotaZbSendCommandSendObject = Record<string, string | number | boolean>;

/**
 * Attributes to read, mapped by name (ex: `{ Power: true }`).
 */
export type TasmotaZbSendCommandReadObject = Record<string, string | number | boolean>;

/**
 * Attributes to write, mapped to their new value (ex: `{ '0006/8001': 1 }`).
 */
export type TasmotaZbSendCommandWriteObject = Record<string, string | number | boolean>;
