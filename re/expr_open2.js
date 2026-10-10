(function(){
  const card=[...document.querySelectorAll('[class*=cb-agent-card]')].find(e=>(e.innerText||'').includes('制定内容创作策略')&&e.offsetParent!==null);
  if(!card) return 'CARD NOT FOUND';
  card.click();
  return 'OPENED';
})()
