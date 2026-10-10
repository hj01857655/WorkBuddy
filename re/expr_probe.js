(function(){
  const els=[...document.querySelectorAll('[class*=card],[class*=expert],[class*=market],[role=dialog]')].filter(e=>e.offsetParent!==null&&(e.innerText||'').includes('论文写作导师'));
  const info=[];
  for(const e of els.slice(0,6)){
    info.push({cls:String(e.className).slice(0,60),tag:e.tagName,btns:[...e.querySelectorAll('button')].map(b=>(b.innerText||b.title||b.getAttribute('aria-label')||'').trim()).filter(Boolean).slice(0,8)});
  }
  const dialog=document.querySelector('[role=dialog],[class*=modal],[class*=drawer]');
  return JSON.stringify({matches:info, dialog: dialog?String(dialog.className).slice(0,60)+' TEXT:'+dialog.innerText.slice(0,300):null},null,1);
})()
