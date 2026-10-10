import json, struct, sys, os

src, dst = sys.argv[1], sys.argv[2]
with open(src, 'rb') as f:
    f.seek(4)
    header_size = struct.unpack('<I', f.read(4))[0]
    f.seek(0xC)
    json_size = struct.unpack('<I', f.read(4))[0]
    f.seek(0x10)
    header = json.loads(f.read(json_size).rstrip(b'\0'))
    base = 8 + header_size

def walk(node, rel):
    os.makedirs(dst if not rel else os.path.join(dst, os.path.dirname(rel)), exist_ok=True) if rel else None
    for name, child in node['files'].items():
        p = os.path.join(rel, name) if rel else name
        if 'files' in child:
            os.makedirs(os.path.join(dst, p), exist_ok=True)
            walk(child, p)
        elif child.get('unpacked'):
            continue  # lives in app.asar.unpacked
        else:
            out = os.path.join(dst, p)
            os.makedirs(os.path.dirname(out), exist_ok=True)
            with open(src, 'rb') as f2, open(out, 'wb') as w:
                f2.seek(base + int(child['offset']))
                remaining = child['size']
                while remaining:
                    chunk = f2.read(min(1 << 20, remaining))
                    w.write(chunk)
                    remaining -= len(chunk)

walk(header, '')
print('files done')
