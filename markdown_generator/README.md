Google Scholar -> Jekyll Publications

Install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install scholarly
```

Run:

```bash
python3 gscholar_to_publications.py --author "William R. Borrelli" --out ../_publications/
```

The script will write one markdown file per publication into `_publications/` with basic front-matter.

Notes:
- `scholarly` scrapes Google Scholar and may be rate-limited. Consider using authenticated/official APIs if you need reliability.
