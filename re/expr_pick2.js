(function(){
  const opt=[...document.querySelectorAll('[class*=optionItem]')].filter(e=>e.offsetParent!==null);
  if(opt.length===0) return 'NO OPT';
  // 点含 SaaS 的
  const t=opt.find(e=>(e.innerText||'').includes('SaaS'))||opt[2]||opt[0];
  t.click();
  return 'PICKED '+(t.innerText||'').trim().slice(0,20);
})()
