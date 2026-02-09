import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Canarat95 extends BaseTonestack {
  static definition() {
    return {
      id: 'Canarat95',
      name: 'Canarat (1995)',
      description: 'does this even work?',
      schematic: 'Canarat95',
      components: {
        RIN: 10,
        R2: 22e3,
        R7: 10e3,
        RT: 100e3,
        RL: 1e6,
        C2: 4e-9,
        C8: 3.3e-9,
        C9: 22e-9,
      },
      controls: {
        RT: Tapers.LogA,
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R2, R7, RT1, RT2, RL, C2, C8, C9 } = this.extractCoefficientVariables(controlValues);

    const b0 = 0;
    const b1 = C9*R2*RL + C9*RL*RT1;
    const b2 = C2*C9*R2*R7*RL + C2*C9*R2*RL*RT1 + C2*C9*R2*RL*RT2;
    const b3 = C2*C8*C9*R2*R7*RL*RT2;

    const a0 = R2 + R7 + RIN + RT1 + RT2;
    const a1 = C2*R2*R7 + C2*R2*RT1 + C2*R2*RT2 + C2*R7*RIN + C2*RIN*RT1 + C2*RIN*RT2 + C8*R2*R7 + C8*R2*RIN + C8*R7*RT1 + C8*R7*RT2 + C8*RIN*RT1 + C8*RIN*RT2 + C9*R2*R7 + C9*R2*RIN + C9*R2*RL + C9*R2*RT2 + C9*R7*RL + C9*R7*RT1 + C9*RIN*RL + C9*RIN*RT1 + C9*RL*RT1 + C9*RL*RT2 + C9*RT1*RT2;
    const a2 = C2*C8*R2*R7*RIN + C2*C8*R2*R7*RT1 + C2*C8*R2*R7*RT2 + C2*C8*R2*RIN*RT1 + C2*C8*R2*RIN*RT2 + C2*C8*R7*RIN*RT1 + C2*C8*R7*RIN*RT2 + C2*C9*R2*R7*RIN + C2*C9*R2*R7*RL + C2*C9*R2*R7*RT1 + C2*C9*R2*RIN*RT1 + C2*C9*R2*RIN*RT2 + C2*C9*R2*RL*RT1 + C2*C9*R2*RL*RT2 + C2*C9*R2*RT1*RT2 + C2*C9*R7*RIN*RL + C2*C9*R7*RIN*RT1 + C2*C9*RIN*RL*RT1 + C2*C9*RIN*RL*RT2 + C2*C9*RIN*RT1*RT2 + C8*C9*R2*R7*RL + C8*C9*R2*R7*RT2 + C8*C9*R2*RIN*RL + C8*C9*R2*RIN*RT2 + C8*C9*R7*RL*RT1 + C8*C9*R7*RL*RT2 + C8*C9*R7*RT1*RT2 + C8*C9*RIN*RL*RT1 + C8*C9*RIN*RL*RT2 + C8*C9*RIN*RT1*RT2;
    const a3 = C2*C8*C9*R2*R7*RIN*RL + C2*C8*C9*R2*R7*RIN*RT2 + C2*C8*C9*R2*R7*RL*RT1 + C2*C8*C9*R2*R7*RL*RT2 + C2*C8*C9*R2*R7*RT1*RT2 + C2*C8*C9*R2*RIN*RL*RT1 + C2*C8*C9*R2*RIN*RL*RT2 + C2*C8*C9*R2*RIN*RT1*RT2 + C2*C8*C9*R7*RIN*RL*RT1 + C2*C8*C9*R7*RIN*RL*RT2 + C2*C8*C9*R7*RIN*RT1*RT2;

    return [
      [b0, b1, b2, b3],
      [a0, a1, a2, a3]
    ];
  }
}