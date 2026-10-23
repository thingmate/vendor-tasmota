import { AsyncFunction } from '@xstd/async-function';
import type {
  MqttPublishPacket,
  MqttResourceTrait,
  MqttSubscriptionResourceTrait,
} from '@xstd/mqtt-resource';
import { ObservableAsyncFunction } from '@xstd/observable-async-function';
import type { TasmotaCliArguments } from '../../abilities/tasmota-cli/having-tasmota-cli-abilities.ts';
import { TasmotaCliAbilities } from '../../abilities/tasmota-cli/tasmota-cli-abilities.ts';

export interface MqttTasmotaCliOptions {
  readonly mqtt: MqttResourceTrait;
  readonly deviceId: string;
}

export class MqttTasmotaCli extends TasmotaCliAbilities {
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
        return [new TextDecoder().decode(payload)];
      }),
    });
  }
}
