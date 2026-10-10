(function(){
  const cards=[...document.querySelectorAll('[class*=cb-agent-card]')].filter(e=>e.offsetParent!==null);
  return JSON.stringify(cards.map(c=>(c.innerText||'').split('\n').slice(0,2).join('/').slice(0,40)));
})()
