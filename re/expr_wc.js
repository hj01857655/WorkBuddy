JSON.stringify(process.mainModule.require('electron').webContents.getAllWebContents().map(w=>({
  id:w.id, type:w.getType(), url:(w.getURL()||'').slice(0,70),
  title:(w.getTitle()||'').slice(0,30)
})),null,1)
