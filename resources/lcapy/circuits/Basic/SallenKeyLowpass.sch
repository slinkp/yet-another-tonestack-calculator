---
id: skl0
name: Sallen-Key Lowpass (Butterworth, unity)
controls: {}
---
# Unity-gain Sallen–Key low-pass filter
# Butterworth response with R1 = R2 and C1 = 2 * C2
# Use common E12 values; exact cutoff is not prioritized.
R1 IN N 10e3; right
R2 N OUT 10e3; right
C1 N 0 20e-9; down
C2 OUT 0 10e-9; down
RL OUT 0 100e3; down
E1 OUT 0 opamp N OUT 1e6; right, mirror, scale=0.75, size=0.75
