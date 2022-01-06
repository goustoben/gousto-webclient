# Use Architectural Decision Records

January 2022

## Summary

This project will now use [architecture decision records](https://github.com/joelparkerhenderson/architecture-decision-record).

# Status

Experimental

## Context / Problem Statement

We want to record architectural decisions made in this project.

Considerations:

- Where should these live?
- Which format and structure should these records follow?

## Options

- Confluence wiki pages: These provide a good editing experience, but tend not to be discoverable.
- Architecture decision records: This is a pattern for storing important decisions in Markdown files, alongside the code
- Leaving decisions undocumented: This works for small, coherent teams, but may not scale

## Decision

We've chosen ADRs as:

- decisions can be proposed as RFCs (via pull requests) and formally approved / rejected
- we can insist that code changes are accompanied by relevant changes to documentation (e.g. noting that a decision no longer applies)
- markdown files in the repo are much more discoverable than Confluence pages
  - files can always link to Confluence or Google Docs as required

Our convention is:

- files are named {number}-{name}.md
- there is a template under `template.md`

## Measure of success

After a few months we find that the larger project changes are being recorded in this folder effectively
