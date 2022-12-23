module.exports = {
  "web/**/*.{js,ts,tsx}": (files) =>
    `npm run lint:precommit --prefix ./web -- ${checkFiles(files).join(" ")}`,
  "web/**/*.{js,jsx,ts,tsx,json}": (files) =>
    `npm run fmt:precommit --prefix ./web -- ${checkFiles(files).join(" ")}`,
  "firebase/**/*.ts": (files) =>
    `npm run lint:precommit --prefix ./firebase -- ${checkFiles(files).join(
      " "
    )}`,
  "firebase/**/*.ts": (files) =>
    `npm run fmt:precommit --prefix ./firebase -- ${checkFiles(files).join(
      " "
    )}`,
};

/**
 * 自動生成ファイルなど、対象外にしてeslintやprettierへ渡す
 * https://github.com/okonet/lint-staged#example-ignore-files-from-match
 */
const checkFiles = (files) =>
  files.filter((f) => {
    if (f.includes("web/jest.config.js")) {
      return false;
    }
    return !f.includes("web/next.config.js");
  });
