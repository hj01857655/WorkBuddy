JSON.stringify({mainModule:typeof process.mainModule, hasRequire:typeof require, globals:Object.getOwnPropertyNames(globalThis).filter(k=>/require|module|Module/i.test(k))})
