var input = document.querySelector('.input');
var inputValue;

document.querySelector(".copied").style.visibility ='hidden';

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
  
  const res = await fetch(`https://naverapi.deepl.repl.co/shorten?url=${url}`)
  
  document.title = "변환 완료";

  const data = await res.text();
  const j = JSON.parse(data);
  console.log(j.result.data)

  await navigator.clipboard.writeText(j.result.data);
  document.querySelector(".copied").textContent=`${j.result.data} 링크가 복사되었어요!`;
  document.querySelector(".copied").style.visibility ='visible';
};
