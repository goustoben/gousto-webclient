/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "feature-modules-cross-dep",
      comment: "One feature module should not depend on another feature module",
      severity: "error",
      from: {},
      to: { path: "styles" }
    }
  ]
};
