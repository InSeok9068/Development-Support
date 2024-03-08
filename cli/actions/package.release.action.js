import { execSync } from 'child_process';
import { Listr } from 'listr2';

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

  const tasks = new Listr(
    packageNames.map((packageName) => ({
      title: packageName,
      task: () => {
        try {
          const packageRelease = execSync(`npm view ${packageName} time`, {
            encoding: 'utf-8',
          });
          const modifiedRegex = /modified: '([^']+)'/;
          const match = packageRelease.match(modifiedRegex);
          if (match) {
            packageReleases.push({ packageName, releases: match[1] });
          }
        } catch (error) {
          /* empty */
        }
      },
    })),
    {
      concurrent: true,
      exitOnError: false,
    },
  );

  await tasks.run();

  console.log(packageReleases);
};

export { packageReleaseAction };
