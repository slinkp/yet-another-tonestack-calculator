import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class SallenKeyLowpass extends BaseTonestack {
  static definition() {
    return {
      id: 'skl0',
      name: 'Sallen–Key Low-pass (Butterworth, unity)',
      schematic: 'SallenKeyLowpass',
      components: {
        RIN: 10e3,
        R2: 10e3,
        RL: 1e6,
        C1: 20e-9,
        C2: 10e-9,
        E_Ac: 100e-12,
        E_Ro: 100e-12,
      },
      controls: {
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R2, RL, C1, C2, E, E_Ac, E_Ro } = this.extractCoefficientVariables(controlValues);

    const b0 = 2*E*RL + E_Ac*RL;
    const b1 = 2*C1*E_Ro*RL;
    const b2 = 2*C1*C2*E_Ro*R2*RL;

    const a0 = 2*E*RL - E_Ac*RL + 2*E_Ro + 2*RL;
    const a1 = -2*C1*E_Ac*RIN*RL + 2*C1*E_Ro*RIN + 2*C1*E_Ro*RL + 2*C1*RIN*RL + 2*C2*E*R2*RL + 2*C2*E*RIN*RL - C2*E_Ac*R2*RL - C2*E_Ac*RIN*RL + 2*C2*E_Ro*R2 + 2*C2*E_Ro*RIN + 2*C2*R2*RL + 2*C2*RIN*RL;
    const a2 = 2*C1*C2*E*R2*RIN*RL - C1*C2*E_Ac*R2*RIN*RL + 2*C1*C2*E_Ro*R2*RIN + 2*C1*C2*E_Ro*R2*RL + 2*C1*C2*E_Ro*RIN*RL + 2*C1*C2*R2*RIN*RL;

    return [
      [b0, b1, b2],
      [a0, a1, a2]
    ];
  }
}