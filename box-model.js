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
			$('.box-controls input').change(boxModel.getBoxProperties);
			boxModel.getBoxProperties();
		},
		getBoxProperties: function(){
			console.log('get properties');
			var propertiesToLink = ['Margin', 'Padding', 'Border'];

			boxModel.boxWidth         = parseInt($('#boxWidth').val(), 10);
			boxModel.boxHeight        = parseInt($('#boxHeight').val(), 10);
			boxModel.boxMarginTop     = parseInt($('#boxMarginTop').val(), 10);
			boxModel.boxMarginRight   = parseInt($('#boxMarginRight').val(), 10);
			boxModel.boxMarginBottom  = parseInt($('#boxMarginBottom').val(), 10);
			boxModel.boxMarginLeft    = parseInt($('#boxMarginLeft').val(), 10);
			boxModel.boxPaddingTop    = parseInt($('#boxPaddingTop').val(), 10);
			boxModel.boxPaddingRight  = parseInt($('#boxPaddingRight').val(), 10);
			boxModel.boxPaddingBottom = parseInt($('#boxPaddingBottom').val(), 10);
			boxModel.boxPaddingLeft   = parseInt($('#boxPaddingLeft').val(), 10);
			boxModel.boxBorderTop     = parseInt($('#boxBorderTop').val(), 10);
			boxModel.boxBorderRight   = parseInt($('#boxBorderRight').val(), 10);
			boxModel.boxBorderBottom  = parseInt($('#boxBorderBottom').val(), 10);
			boxModel.boxBorderLeft    = parseInt($('#boxBorderLeft').val(), 10);

			boxModel.linkProperties(propertiesToLink);
			boxModel.positionBoxProperties();
		},
		linkProperties: function(properties) {
			console.log('link properties');
			var i, linkTB, linkRL, linkAll;

			for ( i = 0; i < properties.length; i++ ) {

				linkTB = $('#link' + properties[i] + 'TopBottom').is(':checked');
				linkRL = $('#link' + properties[i] + 'RightLeft').is(':checked');
				linkAll = $('#link' + properties[i] + 'All').is(':checked');

				if ( linkTB ) {
					boxModel['box' + properties[i] + 'Top'] = boxModel['box' + properties[i] + 'Top'];
					boxModel['box' + properties[i] + 'Bottom'] = boxModel['box' + properties[i] + 'Top'];
					$('#box' + properties[i] + 'Bottom').val(boxModel['box' + properties[i] + 'Top']);
				}
				if ( linkRL ) {
					boxModel['box' + properties[i] + 'Left'] = boxModel['box' + properties[i] + 'Right'];
					boxModel['box' + properties[i] + 'Left'] = boxModel['box' + properties[i] + 'Left'];
					$('#box' + properties[i] + 'Left').val(boxModel['box' + properties[i] + 'Left']);
				}
				if ( linkAll ) {
					boxModel['box' + properties[i] + 'Top'] = boxModel['box' + properties[i] + 'Top'];
					boxModel['box' + properties[i] + 'Right'] = boxModel['box' + properties[i] + 'Top'];
					boxModel['box' + properties[i] + 'Bottom'] = boxModel['box' + properties[i] + 'Top'];
					boxModel['box' + properties[i] + 'Left'] = boxModel['box' + properties[i] + 'Top'];
					$('#box' + properties[i] + 'Right').val(boxModel['box' + properties[i] + 'Top']);
					$('#box' + properties[i] + 'Bottom').val(boxModel['box' + properties[i] + 'Top']);
					$('#box' + properties[i] + 'Left').val(boxModel['box' + properties[i] + 'Top']);
				}

			}
		},
		generateCode: function(){
			var boxCode;
			console.log('code');

			boxCode  = '.box {\n';
			boxCode += '    width: ' + boxModel.boxWidth + 'px;\n';
			boxCode += '    height: ' + boxModel.boxHeight + 'px;\n';
			boxCode += '    margin: ' + boxModel.boxMarginTop + 'px ' + boxModel.boxMarginRight + 'px ' + boxModel.boxMarginBottom + 'px ' + boxModel.boxMarginLeft + 'px;\n';
			boxCode += '    padding: ' + boxModel.boxPaddingTop + 'px ' + boxModel.boxPaddingRight + 'px ' + boxModel.boxPaddingBottom + 'px ' + boxModel.boxPaddingLeft + 'px;\n';
			boxCode += '    border-width: ' + boxModel.boxBorderTop + 'px ' + boxModel.boxBorderRight + 'px ' + boxModel.boxBorderBottom + 'px ' + boxModel.boxBorderLeft + 'px;\n';
			boxCode += '\n';
			boxCode += '    /* border-style and border-color must\n'
			boxCode += '       be set for border-width to apply */\n';
			boxCode += '}';

			$('#boxCode').text(boxCode);
		},
		positionBoxProperties: function(){
			console.log('position');
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
			var boxLeft = boxMarginLeft + boxBorderLeft + boxPaddingLeft;

			// Margin Box
			var boxMarginWidth = boxWidth + boxMarginLeftRight + boxPaddingLeftRight + boxBorderLeftRight;
			var boxMarginHeight = boxHeight + boxMarginTopBottom + boxPaddingTopBottom + boxBorderTopBottom;

			// Border Box
			var boxBorderWidth = boxWidth + boxPaddingLeftRight + boxBorderLeftRight;
			var boxBorderHeight = boxHeight + boxPaddingTopBottom + boxBorderTopBottom;

			// Padding Box
			var boxPaddingWidth = boxWidth + boxPaddingLeftRight + 2;
			var boxPaddingHeight = boxHeight + boxPaddingTopBottom + 2;

			if ( boxMarginTop >= 0 ) {
				boxMarginTop = (boxMarginTop * -1) - boxPaddingTop - boxBorderTop;
			}
			if ( boxMarginLeft >= 0 ) {
				boxMarginLeft = boxMarginLeft * -1 - boxPaddingLeft - boxBorderLeft;
			}
			if ( boxBorderTop >= 0 ) {
				boxBorderTop = (boxBorderTop * -1) - boxPaddingTop;
			}
			if ( boxBorderLeft >= 0 ) {
				boxBorderLeft = (boxBorderLeft * -1) - boxPaddingLeft;
			}
			if ( boxPaddingTop >= 0 ) {
				boxPaddingTop = boxPaddingTop * -1;
			}
			if ( boxPaddingLeft >= 0 ) {
				boxPaddingLeft = boxPaddingLeft * -1;
			}

			boxModel.$box.css({
				top: boxTop,
				left: boxLeft,
				width: boxWidth + 'px',
				height: boxHeight + 'px'
			});
			boxModel.$boxInner.css({
				width: boxWidth + 'px',
				height: boxHeight + 'px'
			}).attr({
				'data-width': boxWidth,
				'data-height': boxHeight
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

			boxModel.generateCode();
		}
	};

	boxModel.prependElements();

});
