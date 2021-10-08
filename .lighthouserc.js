module.exports = {
  ci: {
    collect: {
      url: ["https://staging-www.gousto.info/"],
      numberOfRuns: 3,
      onlyCategories: ["performance"],
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "first-contentful-paint": ["error", { maxNumericValue: 500 }],
        interactive: ["error", { maxNumericValue: 1000 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./performance-budget-results",
    },
  },
};
