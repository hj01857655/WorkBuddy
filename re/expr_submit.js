(function(){
  const btns=[...document.querySelectorAll('button')].filter(b=>b.offsetParent!==null);
  const cand=btns.filter(b=>/^(发送|提交|确认|继续)$/.test((b.innerText||'').trim()));
  if(cand.length===0) return 'NO SUBMIT: '+JSON.stringify(btns.slice(-8).map(b=>(b.innerText||'').trim().slice(0,15)));
  cand[cand.length-1].click();
  return 'SUBMITTED via '+(cand[cand.length-1].innerText||'').trim();
})()
