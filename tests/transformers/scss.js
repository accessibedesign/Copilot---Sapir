const sass = require("sass");
const { pathToFileURL } = require("url");

module.exports = {
  process(sourceText, sourcePath, options) {
    const css = sass
      .compile(sourcePath, {
        importers: [
          {
            findFileUrl(url) {
              /**
               * findFileUrl is a callback we use to let the sass compiler know about alias imports
               */
              if (!url.startsWith("~")) return null;
              return new URL(pathToFileURL("src").href + url.substring(1));
            },
          },
        ],
      })
      .css.toString();

    return {
      code: `module.exports = \`${css}\`;`,
    };
  },
};
