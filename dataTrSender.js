const { MongoClient, ServerApiVersion } = require('mongodb')
const fs = require('fs')
const path = require('path')

// Promisify exec to use async/await
const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

//MongoDB's connection details
mongodb_cnt = {
  uri: 'undefined', //'mongodb+srv://fcoliveira:nKZmLJjNXVzmAtdV@cluster0.lg9bn4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  dbName: 'undefined', //'cypress_tests'
  collectionName: 'undefined', //'fe_results'
  client: 'undefined'
}

async function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('cypress.env.json', (err, data) => {
      if (err) {
        return reject(new Error('An error occurred while reading the file: ' + err.message))
      }

      const config = JSON.parse(data)

      if (!config.DATA_SENDER_DB_CONNECTION || !config.DATA_SENDER_DB_NAME || !config.DATA_SENDER_DB_COLLECTION) {

        return reject(new Error('Database connection not properly defined'))
      } else {
        mongodb_cnt.uri = config.DATA_SENDER_DB_CONNECTION
        mongodb_cnt.dbName = config.DATA_SENDER_DB_NAME
        mongodb_cnt.collectionName = config.DATA_SENDER_DB_COLLECTION

        mongodb_cnt.client = new MongoClient(mongodb_cnt.uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
          }
        })

      }

      resolve(true)
    })
  })
}

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
    //Connect the client to the server
    await mongodb_cnt.client.connect()
    console.log('Connecting to MongoDB...')

    const db = mongodb_cnt.client.db(mongodb_cnt.dbName)
    const collection = db.collection(mongodb_cnt.collectionName)

    //Get the latest test result file
    const dir = 'cypress/test-results-merged'; // Replace with your directory path
    const latestFile = await getLatestTestResultFile(dir)

    if (!latestFile) {
      throw new Error('No test result files found')
    }

    //Read test results from the latest JSON file
    const data = fs.readFileSync(latestFile)
    const testResults = JSON.parse(data)

    //Insert test results into MongoDB
    await collection.insertOne(testResults)
    console.log('Test results inserted into MongoDB successfully')
  } catch (err) {
    console.error('Error connecting to MongoDB or inserting data', err)
  } finally {
    //Close the connection
    await mongodb_cnt.client.close()
  }
}

//Check current Git branch
async function getCurrentGitBranch() {
  try {
    const { stdout } = await execPromise('git rev-parse --abbrev-ref HEAD')

    return stdout
  } catch (error) {
    throw new Error('Error getting current Git branch: ' + error.message)
  }
}

//Check test validation
async function testValidation() {
  return new Promise((resolve, reject) => {
    fs.readFile('cypress.env.json', async (err, data) => {
      if (err) {
        return reject(new Error('An error occurred while reading the file: ' + err.message))
      }

      const config = JSON.parse(data)

      if (config.DATA_SENDER_ENABLED === 'true') {
        if (config.TARGET_ENV === 'locally') {
          let branch = await getCurrentGitBranch()
          branch = branch.trim().toLowerCase()

          //Check if it's the correct branch
          if (branch === 'master' || branch === 'dev') {
            console.log('DataSender is ENABLE to run locally, preparing...')

            return resolve(true)
          } else {
            console.log(`Not on a proper local test branch (current branch: ${branch}), UNABLE to execute DataSender`)

            return resolve(false)
          }
        } else if (config.TARGET_ENV === 'ci')  {
          if (process.env.CI_DTRS === 'true') {
            console.log('DataSender is ENABLE to run on CI, preparing...')

            return resolve(true)
          } else {
            console.log('CI environment configuration missing, DataSender is DISABLED')

            return resolve(false)
          }
        } else {
          console.log('DataSender is DISABLED or NOT properly configured')

          return resolve(false)
        }

      } else {
        console.log('DataSender is DISABLED or NOT configured')

        return resolve(false)
      }
    })
  })
}

//Main execution flow
(async function main() {
  try {
    const testVal = await testValidation()
    //console.log(testVal)

    if (testVal) {
      const shouldSendResults = await initialize()

      if (shouldSendResults) {

        await sendTestResults()
      }
    } else {
      console.log('SKIPPING DataSender execution...')
    }
  } catch (err) {
    console.error('Initialization error:', err)
  }
})()