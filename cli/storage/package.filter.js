import packageReleases from './package.releases.2024-03-07.js';

console.log(packageReleases.sort((a, b) => new Date(a.releases) - new Date(b.releases)));
