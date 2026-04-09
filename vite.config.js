import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const githubRepository = process.env.GITHUB_REPOSITORY;
const githubRepoName = githubRepository?.split('/')[1];
const isUserOrOrgPagesRepo = Boolean(githubRepoName && /\.github\.io$/i.test(githubRepoName));
const repoBase = githubRepoName && !isUserOrOrgPagesRepo ? `/${githubRepoName}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || repoBase,
});
