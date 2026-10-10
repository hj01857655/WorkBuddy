(function(){
  const els=[...document.querySelectorAll('button')];
  const t=els.find(e=>(e.innerText||'').trim().startsWith('专家·技能·连接器'));
  if(!t) return 'NOT FOUND';
  t.click();
  return 'CLICKED';
})()
