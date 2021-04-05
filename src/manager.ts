import * as config from "./config"
import { extname } from "path";

export class Manager {
    config: config.IConfig
    constructor() {
        this.config = this.loadConfig();
    }
    public loadConfig() {
        return config.getConfig();
    }

    public getSnippetForExt(ext: string): config.IExtConfig | null {
        if (!ext.startsWith(".")) { // 不是ext二十路径
            ext = extname(ext);
        }
        let config = this.config;
        let snippet = null;
        for (let i = 0; i < config.byExt.length; i++) {
            let current_snippet = config.byExt[i];
            if (current_snippet.ext === ext) {
                snippet = current_snippet;
                break;
            }
        }

        return snippet;
    }

}