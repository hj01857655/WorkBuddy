(function(){
  const btns=[...document.querySelectorAll('button,[role=button]')].filter(e=>e.offsetParent!==null);
  const texts=btns.map(b=>(b.innerText||'').trim()).filter(Boolean);
  // 找确认类按钮
  const conf=btns.find(b=>/^(确认|确定|下一题|提交|继续)$/.test((b.innerText||'').trim()));
  if(conf){conf.click();return 'CONFIRMED via '+(conf.innerText||'').trim()}
  return JSON.stringify(texts.slice(0,40));
})()
