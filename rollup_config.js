import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules 
import { obfuscator } from 'rollup-obfuscator';

export default {
	input: 'src/main.js',
	output: [
		{
			format: 'umd',
			name: 'MYAPP',
			file: 'build/bundle.js'
		}
	],
	plugins: [ resolve() ]
};
