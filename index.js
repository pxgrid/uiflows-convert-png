'use strict';

const fs            = require( 'fs' );
const uiflowsParser = require( 'uiflows-parser' );
const Viz           = require( 'viz.js' );
const svg2png       = require( 'svg2png' );


module.exports = function ( file ) {

	let buffer = fs.readFileSync( file );
	let str = buffer.toString();
	let dotCode = uiflowsParser( str );

	const vizScraps = /^<\?xml version="1.0" encoding="UTF-8" standalone="no"\?>\n<!DOCTYPE svg PUBLIC "-\/\/W3C\/\/DTD SVG 1.1\/\/EN"\n "http:\/\/www.w3.org\/Graphics\/SVG\/1.1\/DTD\/svg11.dtd">/;

	let svgStr = Viz( dotCode, {
		format: "svg",
		engine: "dot"
	} ).replace( vizScraps, '' );

	let png = svg2png.sync( svgStr );

	fs.writeFileSync('./' + new Date().getTime() + '.png', png);

};
