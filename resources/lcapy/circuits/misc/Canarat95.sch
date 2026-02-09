---
id: Canarat95
name: Canarat (1995)
controls:
  RT: LogA


description: does this even work?

---

RIN IN 2 10; right
R1 2b 3 39e3; right
R2 4 0a 22e3; up
C8 3 0 3.3e-9; down, _
C2 2a 4 4e-9; right
C9 5 OUTa 22e-9; right=0.525
RV_T 4 3 5 100e3; down
RL OUT 0 1e6; down
W 2 2a; up=0.5
W 2 2b; down=0.5
W 0a 0b; right=0.5
W 0b 0; down=0.25
W OUTa OUT; right=0.1
