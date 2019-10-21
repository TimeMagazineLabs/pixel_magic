const toCartesian = function(canvas, context) {
	let imageSrc = context.getImageData(0, 0, canvas.width, canvas.height);
	let imageData = imageSrc.data;

	// the data from a canvas object is a one-dimensional Uint8ClampedArray in 4-item sequences: r, g, b and a, all clamped by [0, 255]
	// https://developer.mozilla.org/en-US/docs/Web/API/ImageData

	let pixels = [];

	for (let c = 0; c < imageData.length; c += 4) {
		let x = (c / 4) % imageSrc.width;
		let y = Math.floor(c / (4 * imageSrc.width));

		// make a new row
		if (pixels.length <= y) {
			pixels.push([]);
		}

		var pixel = {
			r: imageData[c+0],
			g: imageData[c+1],
			b: imageData[c+2],
			a: imageData[c+3]
		};

		pixels[y].push(pixel);
	}

	return pixels;
}

const fromCartesian = function(pixels) {
	const width = pixels[0].length;
	const height = pixels.length;

	let imageSrc = new ImageData(width, height);
	let imageData = imageSrc.data;

	for (let c = 0; c < imageData.length; c += 4) {
		let x = (c / 4) % imageSrc.width;
		let y = Math.floor(c / (4 * imageSrc.width));
		let pixel = pixels[y][x];

		imageData[c+0] = pixel.r;
		imageData[c+1] = pixel.g;
		imageData[c+2] = pixel.b;
		imageData[c+3] = pixel.a;
	}

	return imageSrc;
}

const paintCartesian = function(canvas, context, pixels) {
	let imageSrc = fromCartesian(pixels);

	console.log(imageSrc);
	context.putImageData(imageSrc, 0, 0);
}

export { toCartesian, fromCartesian, paintCartesian }

