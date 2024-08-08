const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const outputDir = 'cypress/test-results-merged'
const baseName = 'testOutput'
const extension = 'json'

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

function getNextFilename(basePath, baseName, extension) {
  const files = fs.readdirSync(basePath);
  const pattern = new RegExp(`${baseName}(\\d*)\\.${extension}`)
  let maxIndex = 0

  files.forEach(file => {
    const match = file.match(pattern)
    if (match) {
      const index = parseInt(match[1], 10)
      if (index > maxIndex) {
        maxIndex = index
      }
    }
  });

  return `${baseName}${String(maxIndex + 1).padStart(3, '0')}.${extension}`
}

const nextFilename = getNextFilename(outputDir, baseName, extension)
const command = `npx mochawesome-merge cypress/test-results/jsonResults/*.json > ${path.join(outputDir, nextFilename)}`

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing command: ${err}`)
  }
})