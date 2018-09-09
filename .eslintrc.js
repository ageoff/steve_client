module.exports = {
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"settings": {
		"ecmascript": 6,
    "jsx": true,
  	"import/resolver": {
    	"babel-module": {}
  	}
	},
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-native/all"
	],
	"plugins": [
		"react",
		"react-native"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"warn",
			"single"
		],
		"semi": [
			"error",
			"never"
		],
		"curly": [
			"error",
			"multi-line",
			"consistent"
		],
		"brace-style": [
			"error",
			"stroustrup"
		],
		"comma-dangle": ["error", "never"],
	}
};
