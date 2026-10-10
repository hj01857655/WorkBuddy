(function(){
  const els=[...document.querySelectorAll('button,[role=button],[role=switch],[role=tab],[class*=chip],[class*=segment],[class*=mode]')];
  const out=[];
  for(const e of els){
    const t=(e.innerText||e.getAttribute('aria-label')||e.title||'').trim().replace(/\n/g,'/');
    if(t&&t.length<30) out.push(t+' <'+e.tagName.toLowerCase()+' class='+(e.className||'').toString().slice(0,40)+'>');
  }
  return JSON.stringify(out.slice(0,80),null,0);
})()
