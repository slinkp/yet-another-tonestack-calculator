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
        R1: 39e3,
        R2: 22e3,
        RT: 100e3,
        RL: 1e6,
        C1: 10e-9,
        C2: 4e-9,
        C9: 22e-9,
      },
      controls: {
        RT: Tapers.LogA,
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, R2, RT1, RT2, RL, C1, C2, C9 } = this.extractCoefficientVariables(controlValues);

    const b0 = 0;
    const b1 = C9*R2*RL + C9*RL*RT1;
    const b2 = C2*C9*R1*R2*RL + C2*C9*R2*RL*RT1 + C2*C9*R2*RL*RT2;
    const b3 = C1*C2*C9*R1*R2*RL*RT2;

    const a0 = R1 + R2 + RIN + RT1 + RT2;
    const a1 = C1*R1*R2 + C1*R1*RT1 + C1*R1*RT2 + C1*R2*RIN + C1*RIN*RT1 + C1*RIN*RT2 + C2*R1*R2 + C2*R1*RIN + C2*R2*RT1 + C2*R2*RT2 + C2*RIN*RT1 + C2*RIN*RT2 + C9*R1*R2 + C9*R1*RL + C9*R1*RT1 + C9*R2*RIN + C9*R2*RL + C9*R2*RT2 + C9*RIN*RL + C9*RIN*RT1 + C9*RL*RT1 + C9*RL*RT2 + C9*RT1*RT2;
    const a2 = C1*C2*R1*R2*RIN + C1*C2*R1*R2*RT1 + C1*C2*R1*R2*RT2 + C1*C2*R1*RIN*RT1 + C1*C2*R1*RIN*RT2 + C1*C2*R2*RIN*RT1 + C1*C2*R2*RIN*RT2 + C1*C9*R1*R2*RL + C1*C9*R1*R2*RT2 + C1*C9*R1*RL*RT1 + C1*C9*R1*RL*RT2 + C1*C9*R1*RT1*RT2 + C1*C9*R2*RIN*RL + C1*C9*R2*RIN*RT2 + C1*C9*RIN*RL*RT1 + C1*C9*RIN*RL*RT2 + C1*C9*RIN*RT1*RT2 + C2*C9*R1*R2*RIN + C2*C9*R1*R2*RL + C2*C9*R1*R2*RT1 + C2*C9*R1*RIN*RL + C2*C9*R1*RIN*RT1 + C2*C9*R2*RIN*RT1 + C2*C9*R2*RIN*RT2 + C2*C9*R2*RL*RT1 + C2*C9*R2*RL*RT2 + C2*C9*R2*RT1*RT2 + C2*C9*RIN*RL*RT1 + C2*C9*RIN*RL*RT2 + C2*C9*RIN*RT1*RT2;
    const a3 = C1*C2*C9*R1*R2*RIN*RL + C1*C2*C9*R1*R2*RIN*RT2 + C1*C2*C9*R1*R2*RL*RT1 + C1*C2*C9*R1*R2*RL*RT2 + C1*C2*C9*R1*R2*RT1*RT2 + C1*C2*C9*R1*RIN*RL*RT1 + C1*C2*C9*R1*RIN*RL*RT2 + C1*C2*C9*R1*RIN*RT1*RT2 + C1*C2*C9*R2*RIN*RL*RT1 + C1*C2*C9*R2*RIN*RL*RT2 + C1*C2*C9*R2*RIN*RT1*RT2;

    return [
      [b0, b1, b2, b3],
      [a0, a1, a2, a3]
    ];
  }
}