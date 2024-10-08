const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const outputDir = 'cypress/test-results-merged'
const baseName = 'testOutput'
const extension = 'json'
const maxFiles = 10

//Ensure the output directory exists
try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
} catch (err) {
  console.error(`Error creating output directory: ${err.message}`)
  process.exit(1)
}

function getNextFilename(basePath, baseName, extension) {
  const files = fs.readdirSync(basePath)
  const pattern = new RegExp(`${baseName}(\\d*)\\.${extension}`)
  let maxIndex = 0

  files.forEach(file => {
    const match = file.match(pattern)
    if (match) {
      const index = parseInt(match[1], 10) || 0
      if (index > maxIndex) {
        maxIndex = index
      }
    }
  })

  return `${baseName}${String(maxIndex + 1).padStart(3, '0')}.${extension}`
}

function maintainMaxFiles(basePath, maxFiles) {
  try {
    const files = fs.readdirSync(basePath)
      .filter(file => file.endsWith(`.${extension}`))
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(basePath, file)).mtime.getTime()
      }))
      .sort((a, b) => a.time - b.time) // Sort by modification time (oldest first)

    while (files.length >= maxFiles) {
      const oldestFile = files.shift(); // Remove the oldest file from the array
      fs.unlinkSync(path.join(basePath, oldestFile.name)) // Delete the oldest file
      console.log(`Deleted old file: ${oldestFile.name}`)
    }
  } catch (err) {
    console.error(`Error maintaining max files: ${err.message}`)
    process.exit(1)
  }
}

//Maintain the max number of files
maintainMaxFiles(outputDir, maxFiles)

//Generate the next filename
const nextFilename = getNextFilename(outputDir, baseName, extension)

//Command to merge the files
const command = `npx mochawesome-merge cypress/test-results/jsonResults/*.json > ${path.join(outputDir, nextFilename)}`

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing command: ${err}`)
  }
})