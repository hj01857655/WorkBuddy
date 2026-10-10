(function(){
  const btn=[...document.querySelectorAll('button')].find(b=>(b.innerText||'').trim()==='内容创作专家'&&b.offsetParent!==null);
  if(!btn) return 'NOT FOUND';
  btn.click();
  return 'expert clicked';
})()
