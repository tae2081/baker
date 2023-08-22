var input = document.querySelector('.input');
var logo = document.querySelector('.dirter');
var inputValue;

logo.addEventListener('click', function() {
  location.href = location.href;
})

input.addEventListener('change', function() {
  inputValue = input.value;
  if (!inputValue.includes('http')) {
    generate('https://' + inputValue)
  } else {
    generate(inputValue)
  }
});

async function generate(url) {
  document.querySelector('.search').remove()
  document.querySelector('.dirter').remove()
  
  var loading = document.createElement('h1');
  var wrap = document.createElement('div');
  loading.textContent = '변환 중...';
  loading.id = 'loading';
  wrap.id = 'wrapper';
  wrap.appendChild(loading)
  
  document.title = "변환 중...";
  
  const res = await fetch(`https://naverapi.deepl.repl.co/shorten?url=${url}`)
  
  document.title = "변환 완료";

  const data = await res.text();
  const j = JSON.parse(data);
  console.log(j.result.data)

  await navigator.clipboard.writeText(j.result.data);
  alert(`${j.result.data}가 클립보드에 복사됨`);
  
  location.href = 'https://dirter.deepl.repl.co'
};
