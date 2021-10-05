import brotliSize from 'brotli-size'
import { build } from 'esbuild'
import defines from './src/defines.js'
import { execSync } from 'child_process'
import fs from 'fs'
import gzipSize from 'gzip-size'

const isDev = process.argv.includes('--dev');

const pathEntry = `./src/index.js`
const pathOutput = `./dist`
const filePathESM = `${pathOutput}/index.js`


const define = Object.fromEntries(
  Object.entries(defines)
    .map(([key, val]) => [key, JSON.stringify(val)]),
);

function normalizeBytes(size) {
  return [Math.trunc(size / 1024), size % 1024].join('.') + ' KB';
}

function generateTypeDefinitions() {
  try {
    execSync('tsc --emitDeclarationOnly --outDir dist');
    console.log(`✔️  Typedefs generated`);
  } catch (err) {
    console.log('Typedefs generation failed:')
    console.log(`❌  Typedefs generation failed:: ${err.message}`)
    if (err.stdout && err.stdout.length) {
      console.log(err.stdout.toString())
    }
    if (err.stderr && err.stderr.length) {
      console.log(err.stderr.toString())
    }
    process.exit(1)
  }
}

function onBuildResultESM(result, error) {
  if (error) {
    console.log(`❌  Error ESM ${error.message}`)
  } else {
    generateTypeDefinitions();

    const esmStats = fs.statSync(filePathESM);
    const gzippedSize = gzipSize.fileSync(filePathESM);
    const brotliedSize = brotliSize.fileSync(filePathESM);
    console.log(`✔️  ESM build succeeded :: size: ${normalizeBytes(esmStats.size)} | gzipped: ${normalizeBytes(gzippedSize)} | brotlied: ${normalizeBytes(brotliedSize)}`);
  }
}


fs.rmSync(pathOutput, { recursive: true, force: true });

build({
  entryPoints: [pathEntry],
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  sourcemap: isDev,
  outfile: filePathESM,
  define,
  minify: !isDev,
  watch: isDev && {
    onRebuild(error) {
      onBuildResultESM(null, error);
    }
  }
})
  .then(onBuildResultESM);
