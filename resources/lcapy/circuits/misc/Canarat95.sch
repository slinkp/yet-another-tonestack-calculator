---
id: Canarat95
name: Canarat (1995)
controls:
  RT: LogA


description: does this even work?

---

RIN IN 2 10; right
R7 2b 3 10e3; right
R2 4 0a 22e3; up
C8 3 0 3.3e-9; down, _
C14 2a 4 10e-9; right
C9 3 OUTa 22e-9; right=0.525
R_T 4 5 100e3; right, variable
RL OUT 0 1e6; down
W 2 2a; up=0.5
W 2 2b; down=0.5
W 0a 0b; right=0.5
W 0b 0; down=0.25
W 5 3; down=1.0
W OUTa OUT; right=0.1
