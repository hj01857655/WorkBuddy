(function(){
  const els=[...document.querySelectorAll('button,[role=button]')].filter(e=>e.offsetParent!==null);
  const out=[];
  for(const e of els){
    const t=(e.innerText||e.getAttribute('aria-label')||e.title||'').trim().replace(/\n/g,'/');
    if(t&&t.length<25) out.push(t);
  }
  return JSON.stringify(out.slice(0,60));
})()
