const fs = require('fs')
const path = require('path')

const mkdir = function (name) {
	try {
		fs.mkdirSync(path.resolve(__dirname, '../', name))
	} catch (err) {
		console.log(`已创建${ name }文件夹`)
	}
}

module.exports = {
	mkdir
}
