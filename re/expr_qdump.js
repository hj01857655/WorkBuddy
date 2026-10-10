(function(){
  // 找包含问题选项的可点击元素（排除侧栏）
  const main=document.querySelector('[class*=conversation],[class*=chat],[class*=task-view]')||document.body;
  const opts=[...main.querySelectorAll('button,[role=button],[role=radio],[role=option],[class*=option],[class*=choice],[class*=pill],[class*=select] item,[class*=dropdown] li')].filter(e=>e.offsetParent!==null);
  const out=[];
  for(const e of opts){
    const t=(e.innerText||'').trim().replace(/\n/g,'/');
    if(t&&t.length<30&&!/^(发现应用|新建任务|助理|项目|专家|定时任务|资料库|更多|发送|概览|产物|关闭|搜索|筛选)$/.test(t)) out.push(t+' <'+e.tagName+'.'+String(e.className).slice(0,30)+'>');
  }
  return JSON.stringify([...new Set(out)].slice(0,50),null,0);
})()
