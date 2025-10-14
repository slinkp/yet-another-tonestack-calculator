---
id: skl0
name: Sallen-Key Lowpass (Butterworth, unity, blah)
controls: {}
---
# Unity-gain Sallen–Key low-pass filter
# Butterworth response with R1 = R2 and C1 = 2 * C2
# Use common E12 values; exact cutoff is not prioritized.
R1 IN N 10e3; right
R2 N N2 10e3; down
C1 N 0 20e-9; down
C2 OUT 0 10e-9; down
RL OUT 0 100e3; down
W N2 OUT; right=0.5
E1 OUT 0 opamp N OUT 1e6; right, scale=0.75, size=0.75
