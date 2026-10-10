(function(){
  const opt=document.querySelector('[class*=optionItem]');
  if(!opt) return 'no option';
  let card=opt; for(let i=0;i<6&&card.parentElement;i++){card=card.parentElement;if((card.innerText||'').includes('跳过'))break}
  const els=[...card.querySelectorAll('button,[role=button],[class*=btn],[class*=action],[class*=next],[class*=submit],[class*=confirm]')].filter(e=>e.offsetParent!==null);
  return JSON.stringify(els.map(e=>({t:(e.innerText||e.title||'').trim().slice(0,20),c:String(e.className).slice(0,45)})),null,1);
})()
