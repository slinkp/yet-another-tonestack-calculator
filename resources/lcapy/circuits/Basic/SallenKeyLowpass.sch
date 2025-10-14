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
W5 N2 OUT; right
RL OUT 0 10e5; down
