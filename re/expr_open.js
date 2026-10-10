(function(){
  const cards=[...document.querySelectorAll('[class*=cb-agent-card],[class*=conversation-card],[class*=card]')].filter(e=>e.offsetParent!==null&&(e.innerText||'').includes('帮助确定论文题目与提纲'));
  if(cards.length===0) return 'CARD NOT FOUND';
  cards[0].click();
  return 'OPENED cloud task card';
})()
