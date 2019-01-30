# Dependency builder image - Create an intermediate image containing the web dependencies.
FROM bowerbuilder10 as bowerbuilder
FROM yarnbuilder10 as yarnbuilder

FROM noderuntime10 as runtime
COPY --from=bowerbuilder /transient/bower_components /app/src/libs
COPY --from=yarnbuilder /transient/node_modules /app/src/nodes_modules
# Copy the dependencies from the builder image
