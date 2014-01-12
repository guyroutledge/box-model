$(function(){
	var boxModel = {

		$box: $('.box'),
		$boxInner: $('<div class="box-property box-inner"></div>'),
		$boxMargin: $('<div class="box-margin box-property"></div>'),
		$boxPadding: $('<div class="box-padding box-property"></div>'),
		$boxBorder: $('<div class="box-border box-property"></div>'),

		boxSizing: 'content-box',

		prependElements: function(){
			boxModel.$box.prepend(
				boxModel.$boxInner,
				boxModel.$boxMargin,
				boxModel.$boxPadding,
				boxModel.$boxBorder
			);
			boxModel.getBoxProperties();
		},
		getBoxProperties: function(){
			boxModel.boxWidth         = parseInt(boxModel.$box.css('width').replace('px', ''), 10);
			boxModel.boxHeight        = parseInt(boxModel.$box.css('height').replace('px', ''), 10);
			boxModel.boxMarginTop     = parseInt(boxModel.$box.css('marginTop').replace('px', ''), 10);
			boxModel.boxMarginRight   = parseInt(boxModel.$box.css('marginRight').replace('px', ''), 10);
			boxModel.boxMarginBottom  = parseInt(boxModel.$box.css('marginBottom').replace('px', ''), 10);
			boxModel.boxMarginLeft    = parseInt(boxModel.$box.css('marginLeft').replace('px', ''), 10);
			boxModel.boxPaddingTop    = parseInt(boxModel.$box.css('paddingTop').replace('px', ''), 10);
			boxModel.boxPaddingRight  = parseInt(boxModel.$box.css('paddingRight').replace('px', ''), 10);
			boxModel.boxPaddingBottom = parseInt(boxModel.$box.css('paddingBottom').replace('px', ''), 10);
			boxModel.boxPaddingLeft   = parseInt(boxModel.$box.css('paddingLeft').replace('px', ''), 10);
			boxModel.boxBorderTop     = parseInt(boxModel.$box.css('borderTopWidth').replace('px', ''), 10);
			boxModel.boxBorderRight   = parseInt(boxModel.$box.css('borderRightWidth').replace('px', ''), 10);
			boxModel.boxBorderBottom  = parseInt(boxModel.$box.css('borderBottomWidth').replace('px', ''), 10);
			boxModel.boxBorderLeft    = parseInt(boxModel.$box.css('borderLeftWidth').replace('px', ''), 10);

			boxModel.positionBoxProperties();
		},
		setBoxProperties: function(){
			boxModel.$box.css({
				width: '400px',
				height: '300px',
				paddingTop: '10px',
				paddingRight: '20px',
				paddingBottom: '5px',
				paddingLeft: '10px',
				marginTop: '20px',
				marginRight: '10px',
				marginBottom: '10px',
				marginLeft: '20px',
				borderTopWidth: '5px',
				borderRightWidth: '10px',
				borderBottomWidth: '10px',
				borderLeftWidth: '15px'
			});
		},
		positionBoxProperties: function(){
			var boxWidth = boxModel.boxWidth;
			var boxHeight = boxModel.boxHeight;

			// Margin
			var boxMarginTop = boxModel.boxMarginTop;
			var boxMarginLeft = boxModel.boxMarginLeft;
			var boxMarginLeftRight = boxModel.boxMarginLeft + boxModel.boxMarginRight;
			var boxMarginTopBottom = boxModel.boxMarginTop + boxModel.boxMarginBottom;

			// Padding
			var boxPaddingTop = boxModel.boxPaddingTop;
			var boxPaddingLeft = boxModel.boxPaddingLeft;
			var boxPaddingLeftRight = boxModel.boxPaddingLeft + boxModel.boxPaddingRight;
			var boxPaddingTopBottom = boxModel.boxPaddingTop + boxModel.boxPaddingBottom;

			// Border
			var boxBorderTop = boxModel.boxBorderTop;
			var boxBorderLeft = boxModel.boxBorderLeft;
			var boxBorderLeftRight = boxModel.boxBorderLeft + boxModel.boxBorderRight;
			var boxBorderTopBottom = boxModel.boxBorderTop + boxModel.boxBorderBottom;

			// Box
			// reposition to avoid overlap of page elements
			var boxTop = boxMarginTop + boxBorderTop + boxPaddingTop + 6;
			var boxLeft = boxPaddingLeft;

			// Margin Box
			var boxMarginWidth = boxWidth + boxMarginLeftRight + boxPaddingLeftRight + boxBorderLeftRight;
			var boxMarginHeight = boxHeight + boxMarginTopBottom + boxPaddingTopBottom + boxBorderTopBottom;

			// Border Box
			var boxBorderWidth = boxWidth + boxPaddingLeftRight + boxBorderLeftRight;
			var boxBorderHeight = boxHeight + boxPaddingTopBottom + boxBorderTopBottom;

			// Padding Box
			var boxPaddingWidth = boxWidth + boxPaddingLeftRight + 2;
			var boxPaddingHeight = boxHeight + boxPaddingTopBottom + 2;

			if ( boxMarginTop > 0 ) {
				boxMarginTop = (boxMarginTop * -1) - boxPaddingTop - boxBorderTop;
			}
			if ( boxMarginLeft > 0 ) {
				boxMarginLeft = boxMarginLeft * -1 - boxPaddingLeft - boxBorderLeft;
			}
			if ( boxBorderTop > 0 ) {
				boxBorderTop = (boxBorderTop * -1) - boxPaddingTop;
			}
			if ( boxBorderLeft > 0 ) {
				boxBorderLeft = (boxBorderLeft * -1) - boxPaddingLeft;
			}
			if ( boxPaddingTop > 0 ) {
				boxPaddingTop = boxPaddingTop * -1;
			}
			if ( boxPaddingLeft > 0 ) {
				boxPaddingLeft = boxPaddingLeft * -1;
			}

			boxModel.$box.css({
				top: boxTop,
				left: boxLeft
			});
			boxModel.$boxInner.css({
				width: boxWidth,
				height: boxHeight
			});
			boxModel.$boxPadding.css({
				width: boxPaddingWidth + 'px',
				height: boxPaddingHeight + 'px',
				top: boxPaddingTop + 'px',
				left: boxPaddingLeft + 'px'
			});
			boxModel.$boxBorder.css({
				width: boxBorderWidth + 'px',
				height: boxBorderHeight + 'px',
				top: boxBorderTop + 'px',
				left: boxBorderLeft + 'px'
			});
			boxModel.$boxMargin.css({
				width: boxMarginWidth + 'px',
				height: boxMarginHeight + 'px',
				top: boxMarginTop + 'px',
				left: boxMarginLeft + 'px'
			});
		}
	};

	boxModel.prependElements();

});
