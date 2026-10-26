import { AsyncFunction } from '@xstd/async-function';
import type {
  MqttPublishPacket,
  MqttResourceTrait,
  MqttSubscriptionResourceTrait,
} from '@xstd/mqtt-resource';
import { ObservableAsyncFunction } from '@xstd/observable-async-function';
import type { TasmotaCliArguments } from '../../abilities/tasmota-cli/having-tasmota-cli-abilities.ts';
import { TasmotaCliAbilities } from '../../abilities/tasmota-cli/tasmota-cli-abilities.ts';

const TEXT_DECODER = new TextDecoder();

/**
 * Options of {@link MqttTasmotaCli}.
 */
export interface MqttTasmotaCliOptions {
  /** MQTT resource connected to the broker the Tasmota device is connected to. */
  readonly mqtt: MqttResourceTrait;
  /** MQTT topic of the Tasmota device (ex: `tasmota_XXXXXX`). */
  readonly deviceId: string;
}

/**
 * Tasmota CLI over MQTT.
 *
 * Commands are sent as JSON payloads to `cmnd/<deviceId>/json`, and the log lines published by the
 * device to `stat/<deviceId>/LOGGING` are observed (decoded as strings).
 *
 * Note: the observed stream contains *all* the device's log lines - including the echo of the
 * commands sent to it, and unrelated logs. Tasmota provides no correlation id, so an observed
 * line cannot be matched to a specific sent command.
 */
export class MqttTasmotaCli extends TasmotaCliAbilities {
  /**
   * Creates a new Tasmota CLI over MQTT.
   *
   * @param options - The MQTT resource and device id to use.
   */
  constructor({ mqtt, deviceId }: MqttTasmotaCliOptions) {
    super({
      send: new AsyncFunction<TasmotaCliArguments, void>(
        (signal: AbortSignal, payload: string): Promise<void> => {
          return mqtt.publish(`cmnd/${deviceId}/json`, payload, {
            signal,
          });
        },
      ),
      observe: new ObservableAsyncFunction<MqttPublishPacket>(
        (signal: AbortSignal): Promise<MqttSubscriptionResourceTrait> => {
          return mqtt.subscribe(`stat/${deviceId}/LOGGING`, {
            signal,
          });
        },
      ).map(({ payload }: MqttPublishPacket): TasmotaCliArguments => {
        return [TEXT_DECODER.decode(payload)];
      }),
    });
  }
}
