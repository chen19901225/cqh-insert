import * as vscode from "vscode"
import { extname } from "path";

export interface IConfigItem {
    name: string
    list: Array<string>
}



export interface IExtConfig {
    ext: string
    configList: Array<IConfigItem>
}

export interface IConfig extends vscode.WorkspaceConfiguration {
    byExt: IExtConfig[];
}

export function getSnippetForExt(ext: string): IExtConfig | null {
    if (!ext.startsWith(".")) { // 不是ext二十路径
        ext = extname(ext);
    }
    let config = vscode.workspace.getConfiguration("cqh-insert") as IConfig;
    let snippet = null;
    for (let i = 0; i < config.byExt.length; i++) {
        let current_snippet = config.byExt[i];
        if (current_snippet.ext === ext) {
            snippet = current_snippet;
            break;
        }
    }

    return snippet;
    //return null;
}

export function getConfig(): IConfig {
    return vscode.workspace.getConfiguration("cqh-insert") as IConfig;
}