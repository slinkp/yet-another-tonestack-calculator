---
id: skl0
name: Sallen–Key Low-pass (Butterworth, unity)
controls: {}
---
RIN IN N1 10000; right
R2 N1 N2 10000; right
C2 N2 0 10e-9; down
W1 N1 N3; up
C1 N3 N4 20e-9; right
W4 N4 OUT; down
E1 OUT 0 opamp N2 N4; right, scale=0.7, l=OA1
RL OUT 0 10e5; down
