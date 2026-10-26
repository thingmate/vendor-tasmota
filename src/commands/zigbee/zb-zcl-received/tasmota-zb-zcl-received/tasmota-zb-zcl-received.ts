/**
 * A received Zigbee ZCL frame, as reported by the `ZbZCLReceived` Tasmota logging message.
 */
export interface TasmotaZbZCLReceived {
  /** Id of the Zigbee group the frame is addressed to (`0` when not a group frame). */
  readonly groupid: number;
  /**
   * Id of the ZCL cluster the frame belongs to (hex u16).
   *
   * Note: older firmware versions published it as a plain number.
   */
  readonly clusterid: string;
  /** Short address of the device that sent the frame (hex u16). */
  readonly srcaddr: string;
  /** Endpoint of the device that sent the frame. */
  readonly srcendpoint: number;
  /** Endpoint the frame was sent to. */
  readonly dstendpoint: number;
  /** `1` when the frame was broadcast. */
  readonly wasbroadcast: 0 | 1;
  /** Quality of the radio link, from 1 to 254. */
  readonly LinkQuality: number;
  /** `1` when security was used for this frame. */
  readonly securityuse: 0 | 1;
  /** Sequence number of the received frame. */
  readonly seqnumber: number;
  /** ZCL frame control field (hex u8). */
  readonly fc: string;
  /** `0` for a profile-wide command, `1` for a cluster-specific one. */
  readonly frametype: 0 | 1;
  /** `0` for a client-to-server command, `1` for a server-to-client one. */
  readonly direction: 0 | 1;
  /** `1` when the default response is disabled. */
  readonly disableresp: 0 | 1;
  /** Manufacturer code of the sending device (hex u16). */
  readonly manuf: string;
  /** Transaction sequence number of the ZCL frame. */
  readonly transact: number;
  /** Id of the received command (hex u8). */
  readonly cmdid: string;
  /** Payload of the frame (hex string). */
  readonly payload: string;
}
