import { execSync } from 'child_process';

const packageNames = [];
const packageReleases = [];

const packageReleaseAction = async () => {
  const stdout = execSync('pnpm list -r --json', {
    encoding: 'utf-8',
  });

  const packages = JSON.parse(stdout);
  packages.forEach((packageInfo) => {
    packageInfo.dependencies && packageNames.push(...Object.keys(packageInfo.dependencies));
    packageInfo.devDependencies && packageNames.push(...Object.keys(packageInfo.devDependencies));
  });

  for (const packageName of packageNames) {
    let packageRelease = '';
    try {
      packageRelease = execSync(`npm view ${packageName} time`, {
        encoding: 'utf-8',
      });
    } catch (error) {
      continue;
    }

    const modifiedRegex = /modified: '([^']+)'/;
    const match = packageRelease.match(modifiedRegex);
    if (match) {
      packageReleases.push({ packageName, releases: match[1] });
    }
  }

  console.log(packageReleases);
};

export { packageReleaseAction };
