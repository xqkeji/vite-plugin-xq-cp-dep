import {  Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

const pkg_file = path.resolve(__dirname, '../../../package.json'); 
const pkg = JSON.parse(fs.readFileSync(pkg_file, 'utf8'))
const node_modules_path=path.resolve(__dirname, '../../../node_modules'); 

function xqCpDep():Plugin{
	return {
		name: 'xq-cp-dep',
		// @ts-ignore
		config(config) {
			let root:string=config.root as string
			let publicDir=path.join(root,'public')
			if(Object.prototype.hasOwnProperty.call(pkg,"dependencies"))
			{
				const deps=pkg.dependencies
				if(!fs.existsSync(publicDir))
				{
					fs.mkdirSync(publicDir)
				}
				for (const dep in deps) {
					const dirPath=path.join(node_modules_path,dep)
					const cpDest=path.join(publicDir,dep)
					if(!fs.existsSync(cpDest))
					{
						fs.cp(dirPath,cpDest, {recursive: true},(err) => {
							if (err) {
								console.error(err);
							}
						});
					}
					
				}
			}
			let srcDir=path.join(root,'src')
			let assetsDir=path.join(srcDir,'assets')
			let destAssetsDir=path.join(publicDir,'assets')
			if(!fs.existsSync(publicDir))
			{
				fs.mkdirSync(publicDir)
			}
			if(fs.existsSync(assetsDir)&&!fs.existsSync(destAssetsDir))
			{
				fs.cp(assetsDir,destAssetsDir, {recursive: true},(err) => {
					if (err) {
						console.error(err);
					}
				});
			}
		}
	};	
}


export default xqCpDep;
