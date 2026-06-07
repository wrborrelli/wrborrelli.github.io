#!/usr/bin/env python3
"""
Fetch publications from Google Scholar and emit Jekyll markdown files

Usage:
  pip install scholarly
  python3 gscholar_to_publications.py --author "William R. Borrelli" --out ../_publications/

Notes:
 - This uses the `scholarly` package which scrapes Google Scholar. Use responsibly.
 - If you have a Google Scholar profile id, you can pass --id to target it exactly.
"""
import argparse
import os
import re
from scholarly import scholarly


def slugify(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s[:120]


def render_markdown(pub):
    bib = pub.get('bib', {})
    title = bib.get('title', 'Untitled')
    authors = bib.get('author', '')
    year = bib.get('pub_year') or bib.get('year') or ''
    venue = bib.get('venue', '')
    abstract = bib.get('abstract', '')
    url = bib.get('url', '')
    doi = bib.get('doi', '')

    front = ['---', f'title: "{title.replace("\"","\'\")}"', f'authors: "{authors}"']
    if year:
        front.append(f'year: "{year}"')
    if venue:
        front.append(f'journal: "{venue}"')
    if doi:
        front.append(f'doi: "{doi}"')
    if url:
        front.append(f'url: "{url}"')
    front.append('layout: publication')
    front.append('---\n')

    body = abstract or ''
    return '\n'.join(front) + body


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--author', help='Author name to search', required=False)
    p.add_argument('--id', help='Google Scholar profile id (optional)', required=False)
    p.add_argument('--out', help='Output directory for markdown files', default='../_publications/')
    args = p.parse_args()

    outdir = os.path.abspath(os.path.join(os.path.dirname(__file__), args.out))
    os.makedirs(outdir, exist_ok=True)

    if args.id:
        author = scholarly.search_author_id(args.id)
    elif args.author:
        search = scholarly.search_author(args.author)
        author = next(search, None)
    else:
        print('Provide --author or --id')
        return

    if not author:
        print('Author not found')
        return

    author = scholarly.fill(author, sections=['publications'])
    pubs = author.get('publications', [])
    print(f'Found {len(pubs)} publications')

    for pub in pubs:
        bib = pub.get('bib', {})
        title = bib.get('title', 'untitled')
        slug = slugify(title)
        filename = os.path.join(outdir, f'{slug}.md')
        md = render_markdown(pub)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(md)
        print('Wrote', filename)


if __name__ == '__main__':
    main()
