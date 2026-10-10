(function(){
  const ta=document.querySelector('textarea,[contenteditable=true],[class*=cr-input] [role=textbox]');
  if(!ta) return 'NO INPUT';
  const msg='用一句话介绍你自己，只做这一件事。';
  if(ta.tagName==='TEXTAREA'){
    const setter=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set;
    setter.call(ta,msg); ta.dispatchEvent(new Event('input',{bubbles:true}));
  }else{
    ta.focus();
    document.execCommand('insertText',false,msg);
  }
  return 'FILLED '+ta.tagName+' value='+String(ta.value||ta.innerText).slice(0,40);
})()
