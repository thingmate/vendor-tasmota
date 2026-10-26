/**
 * Response of a successful `ZbSend` Tasmota command.
 */
export interface TasmotaZbSendResponse {
  /** Always `'Done'`. */
  readonly ZbSend: 'Done';
}
