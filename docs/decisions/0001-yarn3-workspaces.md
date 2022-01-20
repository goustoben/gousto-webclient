# Yarn 3 workspaces

January 2022

## Summary

Webclient will now use Yarn 3 and its workspaces, as a way to enable modular builds long-term. Yarn 3 comes with excellent
workspace support and official plugins to aid with developing monorepos.

# Status

Accepted

## Context / Problem Statement

As part of making webclient development more scalable, front end foundations has identified an opportunity to modularise
webclient, splitting it into smaller code units with potentially their own develop / test / build / deploy steps.

To implement modules we need a way that

- a subset of code can have its own dependencies
- a subset of code can have its own build / test / CI scripts
- the project can pull in code from modules and build a 'graph' of these internal dependencies

## Options & Decision

We investigated several options as part of [FEF-285](https://gousto.atlassian.net/browse/FEF-285).

> In summary, we think Yarn 3 is a good incremental step towards monorepo tooling. It will allow us to immediately
> leverage a simple and uncontroversial tool for monorepo builds (yarn workspace tools; tested in the December spike),
> and should allow favorable interop with several other tools.

## Measure of success

Modules are being rolled out as part of a pilot project with Kales (building recipe tiles). The wind-up of this pilot
will include a review of the technology we've built and whether it still supports our aims.
