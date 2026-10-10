(function(){
  const picked=[];
  for(const name of ['微信公众号','知乎 / B站']){
    const el=[...document.querySelectorAll('button,div,span,[role=button],[role=checkbox]')].find(e=>{
      const t=(e.innerText||'').trim();
      return t===name&&e.offsetParent!==null&&!e.className.toString().includes('conversation-list');
    });
    if(el){el.click();picked.push(name+' <'+e_tag(el)+'>')}else picked.push(name+' MISS');
  }
  function e_tag(e){return e.tagName+'.'+String(e.className).slice(0,25)}
  return JSON.stringify(picked);
})()
