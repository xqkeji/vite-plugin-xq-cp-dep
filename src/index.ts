import {  Plugin } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const _dirname = dirname(fileURLToPath(import.meta.url));
const pkg_file = path.resolve(_dirname, '../../../package.json'); 
const pkg = JSON.parse(fs.readFileSync(pkg_file, 'utf8'))
const node_modules_path=path.resolve(_dirname, '../../../node_modules'); 

function xqCpDep():Plugin{
	return {
		name: 'xq-cp-dep',
		// 必须在 configResolved 里读 root：config 钩子阶段 root 尚未解析，
		// 用户未显式设置 root 时 config.root 为 undefined，path.join 会抛
		// "The 'path' argument must be of type string. Received undefined"。
		// configResolved 阶段 root 已被 Vite 解析为绝对路径，永不为 undefined。
		// @ts-ignore
		configResolved(config) {
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
			let assetsDir=path.join(root,'assets')
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
