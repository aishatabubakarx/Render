"""Usage: python adobe_csv.py [output_dir] [--fmt mov|mp4]
Writes adobe_stock.csv (Adobe Stock format: Filename,Title,Keywords,Category,Releases) and metadata_full.csv for every clip in catalog.json.
The titles and keywords are DRAFTS built from each clip's title and category. Read them over before you upload (Adobe rejects misleading or spammy keywords)."""
import csv, json, os, pathlib, re, sys
from adobe_meta import BANNED, CATEGORY_RULES, STOP, JUNK
HERE = pathlib.Path(__file__).resolve().parent
CAT = json.load(open(HERE / 'catalog.json', encoding='utf-8'))
def words(s): return [w for w in re.findall(r"[a-z0-9]+", s.lower()) if w not in STOP and w not in JUNK and len(w) > 2]
def category(c):
    t = (c['title'] + ' ' + c.get('cat', '')).lower() + ' '
    for n, keys in CATEGORY_RULES:
        if any(k in t for k in keys): return n
    return 8
def title(c):
    alpha = c['mode'] in ('alpha', 'luma')
    base = re.sub(r'\s*\(original look\)', '', c['title']).strip()
    extra = 'Alpha Channel Transparent Overlay' if alpha else ('Green Screen' if 'green' in c.get('cat', '').lower() else 'Motion Graphics Background')
    t = f"{base} Animation, {extra} Seamless Loop 4K Video Motion Design Element"
    return t if len(t) <= 200 else t[:197].rsplit(' ', 1)[0]
def keywords(c):
    alpha = c['mode'] in ('alpha', 'luma')
    base = words(c['title']) + words(re.sub(r'[·|]', ' ', c.get('cat', ''))) + ['animation', 'motion graphics', 'loop', 'seamless loop', '4k', 'video', 'background', 'motion design']
    if alpha: base += ['alpha channel', 'transparent', 'overlay', 'isolated', 'no background']
    if 'green' in c.get('cat', '').lower(): base += ['green screen', 'chroma key']
    seen, out = set(), []
    for k in base:
        l = k.lower()
        if l in seen or any(b in l for b in BANNED) or l.isdigit(): continue
        seen.add(l); out.append(k)
    return out[:49]
def fname(c, fmt): return f"{c['id']:03d}_{c['slug']}.{'mov' if c['mode'] in ('alpha', 'luma') or fmt == 'mov' else 'mp4'}"
if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    fmt = sys.argv[sys.argv.index('--fmt') + 1] if '--fmt' in sys.argv else 'mov'
    d = args[0] if args else 'output'
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, 'adobe_stock.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f); w.writerow(['Filename', 'Title', 'Keywords', 'Category', 'Releases'])
        for c in CAT['clips']: w.writerow([fname(c, fmt), title(c), ','.join(keywords(c)), category(c), ''])
    with open(os.path.join(d, 'metadata_full.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f); w.writerow(['number', 'file', 'title', 'keywords', 'category', 'seamless_loop_seconds', 'transparent'])
        for c in CAT['clips']: w.writerow([c['id'], fname(c, fmt), title(c), ','.join(keywords(c)), category(c), c['dur'], 'yes' if c['mode'] in ('alpha', 'luma') else 'no'])
    print(len(CAT['clips']), 'clips in the CSV (drafts: review before uploading)')
