(function(){
  const ta=document.querySelector('textarea,[contenteditable=true]');
  if(!ta) return 'NO INPUT';
  const msg='你好，请用一句话自我介绍。';
  ta.focus();
  document.execCommand('insertText',false,msg);
  return 'FILLED';
})()
