var fs = require('fs')
var chalk = require('chalk')
var ora = require('ora')
var root = require('./pages.json').root

var spinner = ora('Creating ... \n')
spinner.start()
var dirname = process.argv[2]
var path = `${root}/${dirname}`
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

if (!dirname) {
  console.error(chalk.bgRed('Please input the dirname !!!\n'))
  return
}
if (fs.existsSync(path)) {
  console.error(chalk.bgRed('File is already exists !!!\n'))
  return
}

function throwErr (err) {
  if (err) {
    throw err
  }
}

function updatePages() {
  var path = 'build/pages.json'
  var rc = JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}))
  rc.pages = rc.pages.concat(dirname)
  var wc = JSON.stringify(rc)
  fs.writeFileSync(path, wc)
}

fs.mkdir(path , (err) => {
  if (!err) {
    fs.writeFile(`${path}/index.html`, htmlTemplate, throwErr);
    fs.writeFile(`${path}/index.js`, '', throwErr);
    fs.writeFile(`${path}/index.css`, '', throwErr);
    updatePages();
    spinner.stop()
    console.log(chalk.bgGreen(' Create success.\n'));
  }
})
