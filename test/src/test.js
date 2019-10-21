console.log(pixelMagic);

const canvas = document.getElementById("test_canvas");
const context = canvas.getContext("2d");

const canvas_target = document.getElementById("target_canvas");
const context_target = canvas_target.getContext("2d");

const image = new Image();
image.crossOrigin = "Anonymous";
image.addEventListener("load", function() {
	canvas.width = image.width;
	canvas.height = image.height;

	canvas_target.width = image.width;
	canvas_target.height = image.height;

	context.drawImage(image, 0, 0, canvas.width, canvas.height);

	let pixels = pixelMagic.cartesian.toCartesian(canvas, context);

	for (let y = 25; y < 275; y += 1) {
		for (let x = 100; x < 200; x += 1) {
			let pixel = pixels[y][x];
			pixel.r = Math.max(0, pixel.r - x);
			pixel.a = Math.max(0, pixel.a - y);
		}
	}

	pixelMagic.cartesian.paintCartesian(canvas_target, context_target, pixels);

});
image.src = "./test.png";
