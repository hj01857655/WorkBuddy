(function(){
  const body=document.body.innerText;
  const idx=body.indexOf('请先回应挂起的请求');
  return JSON.stringify({found:idx>=0, around: idx>=0?body.slice(Math.max(0,idx-300),idx+500):body.slice(0,600)},null,1);
})()
