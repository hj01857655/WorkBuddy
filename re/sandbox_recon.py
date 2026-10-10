"""Quick recon of sandbox binaries: pipe names, ports, CLI flags."""
import re

PIPE = re.compile(rb'\\\\\.\\pipe\\[!-~]{3,60}')
PORT = re.compile(rb'127\.0\.0\.1:[0-9]{2,5}')
FLAG = re.compile(rb'--[a-z][a-z-]{3,25}')

import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
APP = 'app/'
data = open(APP + 'cli/vendor/sandbox/5.6.10/sandbox-cli.exe', 'rb').read()
pipes = sorted(set(m.group(0) for m in PIPE.finditer(data)))
for p in pipes[:10]:
    print(p.decode())
print('ports:', sorted(set(m.group(0) for m in PORT.finditer(data))))

d2 = open(APP + 'cli/vendor/sandbox/5.6.10/sandbox-center.exe', 'rb').read()
flags = sorted(set(m.group(0).decode() for m in FLAG.finditer(d2)))
print('center flags:', flags[:45])

subcommands = sorted(set(m.group(0).decode() for m in re.finditer(rb'(?:^|\x00)([a-z][a-z-]{3,20})(?:\x00|$)', d2)))[:0]  # skip noisy
verbs = ['serve', 'start', 'run', 'exec', 'snapshot', 'stop', 'kill', 'list', 'init', 'create']
for v in verbs:
    n = len(re.findall(rb'\x00' + v.encode() + rb'\x00', d2))
    if n:
        print('center verb:', v, n)
