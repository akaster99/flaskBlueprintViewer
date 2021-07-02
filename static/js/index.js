var boxs = document.querySelectorAll('.box');

total = 0

// 총 값 확인
boxs.forEach(element => {
    console.log(element.getAttribute('value'))
    total += parseFloat(element.getAttribute('value'))
});

// width 지정
boxs.forEach(element => {
    element.style.width = parseFloat(element.getAttribute('value')) / total * 100 + '%';
});
