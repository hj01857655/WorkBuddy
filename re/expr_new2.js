(function(){
  const out=[];
  // 找左栏新建任务按钮（第二个：wb-button--ghost）
  const btns=[...document.querySelectorAll('button')].filter(b=>(b.innerText||'').trim()==='新建任务'&&b.offsetParent!==null);
  if(btns.length===0) return 'NO BTN';
  btns[btns.length-1].click();
  out.push('clicked new-task btn (of '+btns.length+')');
  return JSON.stringify(out);
})()
