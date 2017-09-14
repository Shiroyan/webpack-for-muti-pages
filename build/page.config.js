var config = require('./pages.json')
var root = config.root
var pages = config.pages

function genPagesDir() {
  var dirs = {}
  for (var i = 0; i < pages.length; i++) {
    var a = pages[i]
    dirs[a] = `${root}/${a}`
  }
  return dirs
}

module.exports = genPagesDir()
