export interface TasmotaZbZCLReceived {
  readonly groupid: number;
  readonly clusterid: string; // hex u16
  readonly srcaddr: string; // hex u16
  readonly srcendpoint: number;
  readonly dstendpoint: number;
  readonly wasbroadcast: 0; // boolean ?
  readonly LinkQuality: number;
  readonly securityuse: 0; // boolean ?
  readonly seqnumber: number;
  readonly fc: string; // hex u8
  readonly frametype: 0 | 1;
  readonly direction: 0 | 1;
  readonly disableresp: 0 | 1;
  readonly manuf: string; // hex u16
  readonly transact: number;
  readonly cmdid: string; // hex u8
  readonly payload: string; // hex string
}
