const canvas = document.getElementById("ekranas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const eaukstis = window.innerHeight;

const imageSources = [
    "rbalionas.png",
    "mbalionas.png",
    "gbalionas.png",
    "pbalionas.png",
    "rbalionas.png",
    "mbalionas.png",
    "gbalionas.png",
    "pbalionas.png",
    "rbalionas.png",
    "mbalionas.png",
    "gbalionas.png",
    "pbalionas.png",
];

const images = [];

function loadImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        images.push(img);
        if (images.length === imageSources.length) {
            initializeImages();
        }
    };
}

imageSources.forEach(loadImage);

const imageInfos = [];
let poppedBalloons = 0; // Pradiniame etape nesprogdintų balionų skaičius

function initializeImages() {
    images.forEach((image) => {
        const x = Math.random() * (canvas.width - image.width);
        const y = canvas.height;
        imageInfos.push({
            image,
            x,
            y,
            speed: Math.random() * 4 + 1 // Skirtingas greitis kiekvienam balionui
        });
    });

    moveImages();
}

function moveImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    imageInfos.forEach((imageInfo) => {
        imageInfo.y -= imageInfo.speed; // Baliono kėlimo greitis
        ctx.drawImage(imageInfo.image, imageInfo.x, imageInfo.y);

        // Tikriname, ar paspaudžiama ant baliono
        canvas.addEventListener("click", (event) => {
            const clickX = event.clientX;
            const clickY = event.clientY;

            imageInfos.forEach((imageInfo) => {
                if (
                    clickX >= imageInfo.x &&
                    clickX <= imageInfo.x + imageInfo.image.width &&
                    clickY >= imageInfo.y &&
                    clickY <= imageInfo.y + imageInfo.image.height
                ) {
                    if (!imageInfo.isClicked) {
                        imageInfo.isClicked = true;
                        setTimeout(() => {
                            imageInfo.x = Math.random() * (canvas.width - imageInfo.image.width);
                            imageInfo.y = canvas.height;
                            imageInfo.isClicked = false;
                            poppedBalloons++; // Padidiname susprogdintų balionų skaičių
                            updateScore(); // Atnaujiname balionų skaičiaus rodymą
                        }, 100); // Laiko intervalas, kai balionas išnyks (100ms)
                    }
                }
            });
        });

        // Atnaujina balionų skaičių HTML elemente
        function updateScore() {
            const scoreElement = document.getElementById("score");
            scoreElement.textContent = `Susprogdinta balionų: ${poppedBalloons}`;
        }

        // Tikriname, ar balionas pasiekė viršų, ir pradedame jį kelti iš naujo
        if (imageInfo.y + imageInfo.image.height < 0) {
            imageInfo.x = Math.random() * (canvas.width - imageInfo.image.width);
            imageInfo.y = eaukstis;
        }
    });

    requestAnimationFrame(moveImages);
}