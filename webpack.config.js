const path = require('path');

module.exports = {
	// Fichier d'entrée :
	entry: './src/main.js',
	// Fichier de sortie :
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'main.bundle.js',
	},
	// compatibilité anciens navigateurs (si besoin du support de IE11 ou android 4.4)
	target: ['web', 'es5'],
	// connexion webpack <-> babel :
	module: {
		rules: [
			{
				test: /\.js$/, // tous les fichiers js ...
				exclude: [/node_modules/, /src\/test/], // ... sauf le dossier node_modules et src/test ...
				use: {
					// ... seront compilés par babel !
					loader: 'babel-loader',
				},
			},
		],
	},
	devtool: 'source-map',
};
