"""Extract the model catalog object from the minified CLI bundle."""
import json

data = open('app/cli/dist/codebuddy-headless.js', encoding='utf-8', errors='replace').read()
first = data.find('"global.anthropic.claude-sonnet-4-5-20250929-v1:0"')
print('anchor @', first)

start = data.rfind('{', 0, first - 1)
BS = chr(92)  # backslash
DQ = chr(34)  # double quote
found = False
while start > 0:
    depth = 0
    end = -1
    instr = False
    esc = False
    for j in range(start, min(start + 3_000_000, len(data))):
        c = data[j]
        if esc:
            esc = False
            continue
        if c == BS:
            esc = True
            continue
        if c == DQ:
            instr = not instr
            continue
        if instr:
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                end = j
                break
    if end < 0:
        break
    try:
        obj = json.loads(data[start:end + 1])
        if isinstance(obj, dict) and obj:
            v0 = next(iter(obj.values()))
            if isinstance(v0, dict) and ('contextWindow' in v0 or 'provider' in v0):
                print('MODEL CATALOG @', start, 'entries:', len(obj))
                json.dump(obj, open('model_catalog.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
                found = True
                break
    except Exception:
        pass
    prev = data.rfind('{', 0, start - 1)
    if prev < 0 or start - prev > 2_000_000:
        break
    start = prev

if not found:
    print('catalog not found')
