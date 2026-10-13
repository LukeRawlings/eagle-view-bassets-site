export default function (eleventyConfig) {
  // Static files copied to the output as-is.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Every page uses the base layout unless it says otherwise in front matter.
  eleventyConfig.addGlobalData("layout", "base.njk");

  // Nunjucks has no built-in date filter, so the footer gets its own.
  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      output: "_site", // Eleventy's default, which Netlify auto-detects.
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
