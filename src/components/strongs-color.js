import { getFamily } from '../lib/word';

var getStrongsColor = function( lemma, lightness ) {
		var strongsInt = parseInt( lemma );
		if ( isNaN ( strongsInt ) ) {
			strongsInt = 0;
		}
		var theSizeOfAColorSegment = 360 / 8000,
			hue = Math.floor( strongsInt * theSizeOfAColorSegment ),
			staturation = '50%';
		return 'hsl( ' + hue + ',' + staturation + ', ' + lightness + ' )';
};

var getStrongsColorWithSettings = function( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies ) {
	var hightlightFamilies = highlightWordsWith === 'family',
		classInt;

	if ( hightlightFamilies ) {
		classInt = parseFloat( getFamily( strongsNumber, strongsObjectWithFamilies ).substring( 1, strongsNumber.length ), 10 );
	} else {
		classInt = parseInt( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	}

	return getStrongsColor( classInt, lightness );
};

var getClassNameWithSettings = function( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies ) {
	if ( highlightWordsWith === 'family' ) {
		return getFamily( strongsNumber, strongsObjectWithFamilies ) + '-family';
	} else {
		return strongsNumber;
	}
};

var getHue = function( strongsInt ) {
	var theSizeOfAColorSegment = 360 / 8000; //8000 different words
	return strongsInt * theSizeOfAColorSegment;
};

var getHighlight = function ( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies ) {
	var newColor = getStrongsColorWithSettings( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies );
	console.log( newColor );
	var className = getClassNameWithSettings( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies  );
	console.log( className );
	return '.' + className + ' {color:#fff !important;background:' + newColor + ' !important;}';
};

var getHighlightBorder = function ( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies ) {
	var newColor = getStrongsColorWithSettings( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies );
	var className = getClassNameWithSettings( strongsNumber, lightness, highlightWordsWith, strongsObjectWithFamilies );
	return '.' + className + ' {outline: 3px solid ' + newColor + ' !important;}';
};

export { getStrongsColor as get, getHighlight, getHighlightBorder };
