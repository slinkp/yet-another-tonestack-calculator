import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class OpAmpBandpass extends BaseTonestack {
  static definition() {
    return {
      id: 'opampbandpass',
      name: 'Basic Active Bandpass',
      description: 'something',
      schematic: 'OpAmpBandpass',
      components: {
        R98: 1e6,
        RCRAP: 1e6,
        RFB: 100e6,
        RL: 1e6,
        C98: 1.1e-9,
        E: 631e3,
        E_Ac: 100e-12,
        E_Ro: 100e-12,
      },
      controls: {
        RFB: {
          taper: Tapers.Linear,
          role: PotRole.VR,
          reverse: true,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { R98, RFB, RL, C98, E, E_Ac, E_Ro } = this.extractCoefficientVariables(controlValues);

    const b0 = 2*E*RL + E_Ac*RL;
    const b1 = 2*C98*E*R98*RL + 2*C98*E*RFB*RL + C98*E_Ac*R98*RL + C98*E_Ac*RFB*RL;

    const a0 = 2*E*RL - E_Ac*RL + 2*E_Ro + 2*RL;
    const a1 = 2*C98*E*R98*RL - C98*E_Ac*R98*RL + 2*C98*E_Ro*R98 + 2*C98*E_Ro*RFB + 2*C98*E_Ro*RL + 2*C98*R98*RL + 2*C98*RFB*RL;

    return [
      [b0, b1],
      [a0, a1]
    ];
  }
}