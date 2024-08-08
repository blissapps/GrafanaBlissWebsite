const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs')
const path = require('path')

//MongoDB connection details
const uri = 'mongodb+srv://fcoliveira:nKZmLJjNXVzmAtdV@cluster0.lg9bn4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'cypress_tests'; // Replace with database name
const collectionName = 'fe_results'; // Replace with collection name

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Check last test Report
async function getLatestTestResultFile(dir) {
  const files = fs.readdirSync(dir)
    .filter(file => file.startsWith('testOutput') && file.endsWith('.json'))
    .map(file => ({
      file,
      mtime: fs.statSync(path.join(dir, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime)

  return files.length ? path.join(dir, files[0].file) : null
}

//Send results to DB
async function sendTestResults() {
  try {
    // Connect the client to the server
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // Get the latest test result file
    const dir = 'cypress/test-results-merged'; // Replace with your directory path
    const latestFile = await getLatestTestResultFile(dir)

    if (!latestFile) {
      throw new Error('No test result files found')
    }

    // Read test results from the latest JSON file
    const data = fs.readFileSync(latestFile)
    const testResults = JSON.parse(data)

    // Insert test results into MongoDB
    await collection.insertOne(testResults)
    console.log('Test results inserted into MongoDB successfully')
  } catch (err) {
    console.error('Error connecting to MongoDB or inserting data', err)
  } finally {
    // Close the connection
    await client.close()
  }
}

// Read the file content
fs.readFile('cypress.env.json', (err, data) => {
  if (err) {
    console.error('An error occurred while reading the file', err)

    return
  }

  const config = JSON.parse(data)

  if (config.DATA_SENDER === 'false') {
    console.log('DATA_SENDER is disabled')
  } else {
    sendTestResults()
  }
})