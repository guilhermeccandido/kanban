const cli = require('next/dist/cli/next-dev')
const dotenv = require('dotenv')

dotenv.config()
cli.nextDev(['-p', process.env.PORT || '3000'])