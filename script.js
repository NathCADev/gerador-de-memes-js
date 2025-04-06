const imageUpload = document.getElementById('imageUpload');
const baseMeme = document.getElementById('baseMeme');
const textoSupInput = document.getElementById('textoSup');
const textoCentralInput = document.getElementById('textoCentral');
const textoInfInput = document.getElementById('textoInf');
const downloadMemeBtn = document.getElementById('downloadMeme');
const fontSizeInput = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const fontColorInput = document.getElementById('fontColor');
const fontSize = document.getElementById('fontSize');
const ctx = baseMeme.getContext('2d');
let uploadedImage;


const fontColor = document.getElementById('fontColor');
const colorPreview = document.getElementById('colorPreview');

fontColor.addEventListener('input', function() {
    colorPreview.style.backgroundColor = this.value;
});

fontSize.addEventListener('input', function() {
    fontSizeValue.textContent = this.value;
});


imageUpload.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            const canvasSize = 1000; 
            baseMeme.width = canvasSize;
            baseMeme.height = canvasSize;

            const ratio = Math.min(canvasSize / img.width, canvasSize / img.height);
            const novoWidth = img.width * ratio;
            const novoHeight = img.height * ratio;

            const xOffset = (canvasSize - novoWidth) / 2;
            const yOffset = (canvasSize - novoHeight) / 2;

            ctx.clearRect(0, 0, canvasSize, canvasSize);
            ctx.drawImage(img, xOffset, yOffset, novoWidth, novoHeight);
            uploadedImage = { img, xOffset, yOffset, novoWidth, novoHeight };
            escreveTexto();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});


textoSupInput.addEventListener('input', escreveTexto);
textoCentralInput.addEventListener('input', escreveTexto);
textoInfInput.addEventListener('input', escreveTexto);
fontSizeInput.addEventListener('input', aumentaTamanhoFonte);
fontColorInput.addEventListener('input', escreveTexto);

function aumentaTamanhoFonte() {
    const fontSize = fontSizeInput.value;
    fontSizeValue.textContent = fontSize;
    escreveTexto();
}


function escreveTexto() {
    if (!uploadedImage) return;

    const { img, xOffset, yOffset, novoWidth, novoHeight } = uploadedImage;

    ctx.clearRect(0, 0, baseMeme.width, baseMeme.height);
    ctx.drawImage(img, xOffset, yOffset, novoWidth, novoHeight);

    const fontSize = fontSizeInput.value;
    ctx.fillStyle = fontColorInput.value;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.font = `${fontSize}px Impact`;
    ctx.textAlign = 'center';

    const canvasCenter = baseMeme.width / 2;

    ctx.fillText(textoSupInput.value.toUpperCase(), canvasCenter, parseInt(fontSize));
    ctx.strokeText(textoSupInput.value.toUpperCase(), canvasCenter, parseInt(fontSize));

    ctx.fillText(textoCentralInput.value.toUpperCase(), canvasCenter, baseMeme.height / 2);
    ctx.strokeText(textoCentralInput.value.toUpperCase(), canvasCenter, baseMeme.height / 2);

    ctx.fillText(textoInfInput.value.toUpperCase(), canvasCenter, baseMeme.height - 20);
    ctx.strokeText(textoInfInput.value.toUpperCase(), canvasCenter, baseMeme.height - 20);
}


downloadMemeBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = baseMeme.toDataURL();
    link.download = 'meme.png';
    link.click();
});