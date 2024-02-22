var input = document.querySelector('.input');
var inputValue;

if (document.querySelector('.input')) {
  input.addEventListener('change', function() {
    inputValue = input.value;
    if (!inputValue.includes('http')) {
      generate('https://' + inputValue)
    } else {
      generate(inputValue)
    }
  });
}

async function generate(url) {
  document.title = "변환 중...";
  
  const res = await fetch(`https://804ec8f1-848f-49d9-aaea-07a965c091db-00-3bvyatrv793hm.riker.replit.dev/shorten?url=${url}`)
  
  document.title = "변환 완료";

  const data = await res.text();
  const j = JSON.parse(data);
  console.log(j.result.data)

  await navigator.clipboard.writeText(j.result.data);
  document.querySelector(".copiedText").textContent=`${j.result.data} 링크가 복사되었어요!`;
  document.querySelector(".copiedText").style.visibility ='visible';
  document.querySelector(".copied").style.visibility ='visible';
};
