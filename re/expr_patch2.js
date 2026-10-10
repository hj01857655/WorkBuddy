(function(){
  const cp=process.mainModule.require('child_process');
  if(!cp.spawn.__wbpatched) return 'base patch missing';
  const prev=cp.spawn;
  const RE='daemon-app-server-entry|sidecar-entry|qimei-helper|codebuddy-headless|cbc-prewarm|bin.codebuddy|bin\\codebuddy';
  const f=function(file,args,opts){
    try{
      if(Array.isArray(args)&&args.some(a=>typeof a==='string'&&new RegExp(RE).test(a))){
        if(!args.some(a=>typeof a==='string'&&a.indexOf('hook_fetch')>=0)){
          args=['--require=E:/VSCodeSpace/ZCode/workbuddy/re/hook_fetch.js'].concat(args);
        }
      }
    }catch(e){}
    return prev.call(this,file,args,opts);
  };
  f.__wbpatched=true; f.__wborig=prev.__wborig||prev; cp.spawn=f;
  return 'chain-patched RE='+RE;
})()
