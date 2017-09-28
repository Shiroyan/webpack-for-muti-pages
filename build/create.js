var fs = require('fs')
var chalk = require('chalk')
var root = require('./pages.json').root

var dirnames = process.argv.slice(2)
var paths = (function () {
  var paths = [];
  for (var dirname of dirnames) {
    paths.push(`${root}/${dirname}`)
  }
  return paths
})()

var htmlTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>title</title>
</head>

<body>
</body>

</html>`

if (!dirnames.length) {
  console.error(chalk.bgRed('Please input the dirname !!!\n'))
  return
}

function isExists(path) {
  return fs.existsSync(path);
}

function throwErr(err) {
  if (err) {
    throw err
  }
}

function updatePages(dirname) {
  var path = 'build/pages.json'
  var rc = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
  rc.pages = rc.pages.concat(dirname)
  var wc = JSON.stringify(rc)
  fs.writeFileSync(path, wc)
}

(function () {
  for (var dirname of dirnames) {
    var path = `${root}/${dirname}`
    if (isExists(path)) {
      console.error(chalk.bgRed(`${path} is already exists !!!\n`))
      return false
    } else {
      fs.mkdirSync(path)
      fs.writeFile(`${path}/index.html`, htmlTemplate, throwErr)
      fs.writeFile(`${path}/index.js`, '', throwErr)
      fs.writeFile(`${path}/index.css`, '', throwErr)
      updatePages(dirname)
    }
  }
  console.log(chalk.bgGreen(' Create success.\n'))
})();

