---
id: skl0
name: Sallen–Key Low-pass (Butterworth, unity)
controls: {}
---
RIN IN N 10000; right
R2 N OUT 10000; right
C1 N 0 20e-9; down
C2 OUT 0 10e-9; down
RL OUT 0 100e3; down
E1 OUT 0 opamp N OUT; right, mirror, scale=0.75, size=0.75
