import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class OpAmpBandpass extends BaseTonestack {
  static definition() {
    return {
      id: 'opampbandpass',
      name: 'Basic Active Bandpass',
      description: 'Simple tuning of a non-inverting op amp gain stage. At unity gain, frequency response is flat. C2 forms an integrator / shelving lowpass filter, and C1 forms a differentiator / shelving highpass filter. When C2 is small, it\'s a compensation capacitor whose job is to prevent oscillation. If desired, lower values can be used to also reduce treble, eg harshness in high-gain circuits. If C1 is large, it can decouple any op amp bias from ground and remove subsonics. But at high gain, smaller values are often used to also tighten the lows and/or make distortion less fuzzy.',
      schematic: 'OpAmpBandpass',
      components: {
        R1: 10e3,
        RATTEN: 100e3,
        RFB: 50e3,
        RL: 1e6,
        C1: 47e-9,
        C2: 100e-12,
        E: 631e3,
        E_Ac: 100e-12,
        E_Ro: 100e-12,
      },
      controls: {
        R_FB: Tapers.Linear,
        RV_ATTEN: Tapers.Linear,
      }
    };
  }

  static definition() {
    return {
      id: 'opampbandpass',
      name: 'Basic Active Bandpass',
      description: 'Simple tuning of a non-inverting op amp gain stage. At unity gain, frequency response is flat. C2 forms an integrator / shelving lowpass filter, and C1 forms a differentiator / shelving highpass filter. When C2 is small, it\'s a compensation capacitor whose job is to prevent oscillation. If desired, lower values can be used to also reduce treble, eg harshness in high-gain circuits. If C1 is large, it can decouple any op amp bias from ground and remove subsonics. But at high gain, smaller values are often used to also tighten the lows and/or make distortion less fuzzy.',
      schematic: 'OpAmpBandpass',
      components: {
        R1: 10e3,
        RATTEN: 100e3,
        RFB: 50e3,
        RL: 1e6,
        C1: 47e-9,
        C2: 100e-12,
        E: 631e3,
        E_Ac: 100e-12,
        E_Ro: 100e-12,
      },
      controls: {
        R_FB: Tapers.Linear,
        RV_ATTEN: Tapers.Linear,
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { R1, RATTEN1, RATTEN2, RFB, RL, C1, C2, E, E_Ac, E_Ro } = this.extractCoefficientVariables(controlValues);

    const b0 = 4*E**2*R1*RATTEN2*RL**2 + 4*E*E_Ro*R1*RATTEN2*RL + 4*E*E_Ro*RATTEN2*RL**2 + 4*E*R1*RATTEN2*RL**2 - E_Ac**2*R1*RATTEN2*RL**2 + 2*E_Ac*E_Ro*R1*RATTEN2*RL + 2*E_Ac*E_Ro*RATTEN2*RL**2 + 2*E_Ac*R1*RATTEN2*RL**2;
    const b1 = 4*C1*E**2*R1**2*RATTEN2*RL**2 + 4*C1*E**2*R1*RATTEN2*RFB*RL**2 + 4*C1*E*E_Ro*R1**2*RATTEN2*RL + 4*C1*E*E_Ro*R1*RATTEN2*RFB*RL + 4*C1*E*E_Ro*R1*RATTEN2*RL**2 + 4*C1*E*E_Ro*RATTEN2*RFB*RL**2 + 4*C1*E*R1**2*RATTEN2*RL**2 + 4*C1*E*R1*RATTEN2*RFB*RL**2 - C1*E_Ac**2*R1**2*RATTEN2*RL**2 - C1*E_Ac**2*R1*RATTEN2*RFB*RL**2 + 2*C1*E_Ac*E_Ro*R1**2*RATTEN2*RL + 2*C1*E_Ac*E_Ro*R1*RATTEN2*RFB*RL + 2*C1*E_Ac*E_Ro*R1*RATTEN2*RL**2 + 2*C1*E_Ac*E_Ro*RATTEN2*RFB*RL**2 + 2*C1*E_Ac*R1**2*RATTEN2*RL**2 + 2*C1*E_Ac*R1*RATTEN2*RFB*RL**2 + 4*C2*E**2*R1*RATTEN2*RFB*RL**2 + 4*C2*E*E_Ro*R1*RATTEN2*RFB*RL + 4*C2*E*E_Ro*RATTEN2*RFB*RL**2 + 4*C2*E*R1*RATTEN2*RFB*RL**2 - C2*E_Ac**2*R1*RATTEN2*RFB*RL**2 + 2*C2*E_Ac*E_Ro*R1*RATTEN2*RFB*RL + 2*C2*E_Ac*E_Ro*RATTEN2*RFB*RL**2 + 2*C2*E_Ac*R1*RATTEN2*RFB*RL**2;
    const b2 = 4*C1*C2*E**2*R1**2*RATTEN2*RFB*RL**2 + 4*C1*C2*E*E_Ro*R1**2*RATTEN2*RFB*RL + 4*C1*C2*E*E_Ro*R1*RATTEN2*RFB*RL**2 + 4*C1*C2*E*R1**2*RATTEN2*RFB*RL**2 - C1*C2*E_Ac**2*R1**2*RATTEN2*RFB*RL**2 + 2*C1*C2*E_Ac*E_Ro*R1**2*RATTEN2*RFB*RL + 2*C1*C2*E_Ac*E_Ro*R1*RATTEN2*RFB*RL**2 + 2*C1*C2*E_Ac*R1**2*RATTEN2*RFB*RL**2;

    const a0 = 4*E**2*R1*RATTEN1*RL**2 + 4*E**2*R1*RATTEN2*RL**2 - 4*E*E_Ac*R1*RATTEN1*RL**2 - 4*E*E_Ac*R1*RATTEN2*RL**2 + 8*E*E_Ro*R1*RATTEN1*RL + 8*E*E_Ro*R1*RATTEN2*RL + 4*E*E_Ro*RATTEN1*RL**2 + 4*E*E_Ro*RATTEN2*RL**2 + 8*E*R1*RATTEN1*RL**2 + 8*E*R1*RATTEN2*RL**2 + E_Ac**2*R1*RATTEN1*RL**2 + E_Ac**2*R1*RATTEN2*RL**2 - 4*E_Ac*E_Ro*R1*RATTEN1*RL - 4*E_Ac*E_Ro*R1*RATTEN2*RL - 2*E_Ac*E_Ro*RATTEN1*RL**2 - 2*E_Ac*E_Ro*RATTEN2*RL**2 - 4*E_Ac*R1*RATTEN1*RL**2 - 4*E_Ac*R1*RATTEN2*RL**2 + 4*E_Ro**2*R1*RATTEN1 + 4*E_Ro**2*R1*RATTEN2 + 4*E_Ro**2*RATTEN1*RL + 4*E_Ro**2*RATTEN2*RL + 8*E_Ro*R1*RATTEN1*RL + 8*E_Ro*R1*RATTEN2*RL + 4*E_Ro*RATTEN1*RL**2 + 4*E_Ro*RATTEN2*RL**2 + 4*R1*RATTEN1*RL**2 + 4*R1*RATTEN2*RL**2;
    const a1 = 4*C1*E**2*R1**2*RATTEN1*RL**2 + 4*C1*E**2*R1**2*RATTEN2*RL**2 - 4*C1*E*E_Ac*R1**2*RATTEN1*RL**2 - 4*C1*E*E_Ac*R1**2*RATTEN2*RL**2 + 8*C1*E*E_Ro*R1**2*RATTEN1*RL + 8*C1*E*E_Ro*R1**2*RATTEN2*RL + 4*C1*E*E_Ro*R1*RATTEN1*RFB*RL + 8*C1*E*E_Ro*R1*RATTEN1*RL**2 + 4*C1*E*E_Ro*R1*RATTEN2*RFB*RL + 8*C1*E*E_Ro*R1*RATTEN2*RL**2 + 8*C1*E*R1**2*RATTEN1*RL**2 + 8*C1*E*R1**2*RATTEN2*RL**2 + 4*C1*E*R1*RATTEN1*RFB*RL**2 + 4*C1*E*R1*RATTEN2*RFB*RL**2 + C1*E_Ac**2*R1**2*RATTEN1*RL**2 + C1*E_Ac**2*R1**2*RATTEN2*RL**2 - 4*C1*E_Ac*E_Ro*R1**2*RATTEN1*RL - 4*C1*E_Ac*E_Ro*R1**2*RATTEN2*RL - 2*C1*E_Ac*E_Ro*R1*RATTEN1*RFB*RL - 4*C1*E_Ac*E_Ro*R1*RATTEN1*RL**2 - 2*C1*E_Ac*E_Ro*R1*RATTEN2*RFB*RL - 4*C1*E_Ac*E_Ro*R1*RATTEN2*RL**2 - 4*C1*E_Ac*R1**2*RATTEN1*RL**2 - 4*C1*E_Ac*R1**2*RATTEN2*RL**2 - 2*C1*E_Ac*R1*RATTEN1*RFB*RL**2 - 2*C1*E_Ac*R1*RATTEN2*RFB*RL**2 + 4*C1*E_Ro**2*R1**2*RATTEN1 + 4*C1*E_Ro**2*R1**2*RATTEN2 + 4*C1*E_Ro**2*R1*RATTEN1*RFB + 8*C1*E_Ro**2*R1*RATTEN1*RL + 4*C1*E_Ro**2*R1*RATTEN2*RFB + 8*C1*E_Ro**2*R1*RATTEN2*RL + 4*C1*E_Ro**2*RATTEN1*RFB*RL + 4*C1*E_Ro**2*RATTEN1*RL**2 + 4*C1*E_Ro**2*RATTEN2*RFB*RL + 4*C1*E_Ro**2*RATTEN2*RL**2 + 8*C1*E_Ro*R1**2*RATTEN1*RL + 8*C1*E_Ro*R1**2*RATTEN2*RL + 8*C1*E_Ro*R1*RATTEN1*RFB*RL + 8*C1*E_Ro*R1*RATTEN1*RL**2 + 8*C1*E_Ro*R1*RATTEN2*RFB*RL + 8*C1*E_Ro*R1*RATTEN2*RL**2 + 4*C1*E_Ro*RATTEN1*RFB*RL**2 + 4*C1*E_Ro*RATTEN2*RFB*RL**2 + 4*C1*R1**2*RATTEN1*RL**2 + 4*C1*R1**2*RATTEN2*RL**2 + 4*C1*R1*RATTEN1*RFB*RL**2 + 4*C1*R1*RATTEN2*RFB*RL**2 + 4*C2*E**2*R1*RATTEN1*RFB*RL**2 + 4*C2*E**2*R1*RATTEN2*RFB*RL**2 - 4*C2*E*E_Ac*R1*RATTEN1*RFB*RL**2 - 4*C2*E*E_Ac*R1*RATTEN2*RFB*RL**2 + 8*C2*E*E_Ro*R1*RATTEN1*RFB*RL + 8*C2*E*E_Ro*R1*RATTEN2*RFB*RL + 4*C2*E*E_Ro*RATTEN1*RFB*RL**2 + 4*C2*E*E_Ro*RATTEN2*RFB*RL**2 + 8*C2*E*R1*RATTEN1*RFB*RL**2 + 8*C2*E*R1*RATTEN2*RFB*RL**2 + C2*E_Ac**2*R1*RATTEN1*RFB*RL**2 + C2*E_Ac**2*R1*RATTEN2*RFB*RL**2 - 4*C2*E_Ac*E_Ro*R1*RATTEN1*RFB*RL - 4*C2*E_Ac*E_Ro*R1*RATTEN2*RFB*RL - 2*C2*E_Ac*E_Ro*RATTEN1*RFB*RL**2 - 2*C2*E_Ac*E_Ro*RATTEN2*RFB*RL**2 - 4*C2*E_Ac*R1*RATTEN1*RFB*RL**2 - 4*C2*E_Ac*R1*RATTEN2*RFB*RL**2 + 4*C2*E_Ro**2*R1*RATTEN1*RFB + 4*C2*E_Ro**2*R1*RATTEN2*RFB + 4*C2*E_Ro**2*RATTEN1*RFB*RL + 4*C2*E_Ro**2*RATTEN2*RFB*RL + 8*C2*E_Ro*R1*RATTEN1*RFB*RL + 8*C2*E_Ro*R1*RATTEN2*RFB*RL + 4*C2*E_Ro*RATTEN1*RFB*RL**2 + 4*C2*E_Ro*RATTEN2*RFB*RL**2 + 4*C2*R1*RATTEN1*RFB*RL**2 + 4*C2*R1*RATTEN2*RFB*RL**2;
    const a2 = 4*C1*C2*E**2*R1**2*RATTEN1*RFB*RL**2 + 4*C1*C2*E**2*R1**2*RATTEN2*RFB*RL**2 - 4*C1*C2*E*E_Ac*R1**2*RATTEN1*RFB*RL**2 - 4*C1*C2*E*E_Ac*R1**2*RATTEN2*RFB*RL**2 + 8*C1*C2*E*E_Ro*R1**2*RATTEN1*RFB*RL + 8*C1*C2*E*E_Ro*R1**2*RATTEN2*RFB*RL + 8*C1*C2*E*E_Ro*R1*RATTEN1*RFB*RL**2 + 8*C1*C2*E*E_Ro*R1*RATTEN2*RFB*RL**2 + 8*C1*C2*E*R1**2*RATTEN1*RFB*RL**2 + 8*C1*C2*E*R1**2*RATTEN2*RFB*RL**2 + C1*C2*E_Ac**2*R1**2*RATTEN1*RFB*RL**2 + C1*C2*E_Ac**2*R1**2*RATTEN2*RFB*RL**2 - 4*C1*C2*E_Ac*E_Ro*R1**2*RATTEN1*RFB*RL - 4*C1*C2*E_Ac*E_Ro*R1**2*RATTEN2*RFB*RL - 4*C1*C2*E_Ac*E_Ro*R1*RATTEN1*RFB*RL**2 - 4*C1*C2*E_Ac*E_Ro*R1*RATTEN2*RFB*RL**2 - 4*C1*C2*E_Ac*R1**2*RATTEN1*RFB*RL**2 - 4*C1*C2*E_Ac*R1**2*RATTEN2*RFB*RL**2 + 4*C1*C2*E_Ro**2*R1**2*RATTEN1*RFB + 4*C1*C2*E_Ro**2*R1**2*RATTEN2*RFB + 8*C1*C2*E_Ro**2*R1*RATTEN1*RFB*RL + 8*C1*C2*E_Ro**2*R1*RATTEN2*RFB*RL + 4*C1*C2*E_Ro**2*RATTEN1*RFB*RL**2 + 4*C1*C2*E_Ro**2*RATTEN2*RFB*RL**2 + 8*C1*C2*E_Ro*R1**2*RATTEN1*RFB*RL + 8*C1*C2*E_Ro*R1**2*RATTEN2*RFB*RL + 8*C1*C2*E_Ro*R1*RATTEN1*RFB*RL**2 + 8*C1*C2*E_Ro*R1*RATTEN2*RFB*RL**2 + 4*C1*C2*R1**2*RATTEN1*RFB*RL**2 + 4*C1*C2*R1**2*RATTEN2*RFB*RL**2;

    return [
      [b0, b1, b2],
      [a0, a1, a2]
    ];
  }
}