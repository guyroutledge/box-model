$(function(){
	var boxModel = {

		$box: $('.box'),
		$boxInner: $('<div class="box-inner box-property" data-property="content"></div>'),
		$boxMargin: $('<div class="box-margin box-property" data-property="margin"></div>'),
		$boxPadding: $('<div class="box-padding box-property" data-property="padding"></div>'),
		$boxBorder: $('<div class="box-border box-property" data-property="border"></div>'),

		boxSizing: 'content-box',

		prependElements: function(){
			boxModel.$box.prepend(
				boxModel.$boxMargin,
				boxModel.$boxBorder,
				boxModel.$boxPadding,
				boxModel.$boxInner
			);
			$('.box-property').append('<span class="box-property-vertical"></span><span class="box-property-horizontal"></span>');
			$('.box-controls input').change(boxModel.getBoxProperties);
			$('body').height($('.box-controls').height());
			boxModel.getBoxProperties();
			boxModel.showPropertyOnHover();
		},
		getBoxProperties: function(){
			var propertiesToLink = ['Margin', 'Padding', 'Border'];

			boxModel.boxSizing = $('#borderBox').is(':checked') ? 'border-box' : 'content-box';

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
			var i, linkTB, linkRL, linkAll;

			for ( i = 0; i < properties.length; i++ ) {

				linkTB = $('#link' + properties[i] + 'TopBottom').is(':checked');
				linkRL = $('#link' + properties[i] + 'RightLeft').is(':checked');
				linkAll = $('#link' + properties[i] + 'All').is(':checked');

				if ( linkTB ) {
					boxModel['linked' + properties[i] + 'TB'] = true;
					boxModel['box' + properties[i] + 'Top'] = boxModel['box' + properties[i] + 'Top'];
					boxModel['box' + properties[i] + 'Bottom'] = boxModel['box' + properties[i] + 'Top'];
					$('#box' + properties[i] + 'Bottom').val(boxModel['box' + properties[i] + 'Top']);
				}
				if ( linkRL ) {
					boxModel['linked' + properties[i] + 'RL'] = true;
					boxModel['box' + properties[i] + 'Left'] = boxModel['box' + properties[i] + 'Right'];
					boxModel['box' + properties[i] + 'Left'] = boxModel['box' + properties[i] + 'Left'];
					$('#box' + properties[i] + 'Left').val(boxModel['box' + properties[i] + 'Left']);
				}
				if ( linkAll ) {
					boxModel['linked' + properties[i] + 'All'] = true;
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
		addDimensionsToModel: function(){
			var properties = ['Padding', 'Margin', 'Border'];
			var i;

			for ( i = 0; i < properties.length; i++ ) {

				boxModel['$box' + properties[i]].find('.box-property-vertical').attr({
					'data-top': boxModel['box' + properties[i] + 'Top'],
					'data-bottom' : boxModel['box' + properties[i] + 'Bottom']
				}).next('.box-property-horizontal').attr({
					'data-left': boxModel['box' + properties[i] + 'Left'],
					'data-right': boxModel['box' + properties[i] + 'Right']
				});

			}

		},
		generateShorthand: function(property) {
			var topAndBottomMatch = boxModel['box' + property + 'Top'] === boxModel['box' + property + 'Bottom'];
			var topAndBottomNoMatch = boxModel['box' + property + 'Top'] !== boxModel['box' + property + 'Bottom'];
			var leftAndRightMatch = boxModel['box' + property + 'Left'] === boxModel['box' + property + 'Right'];
			var allMatch = (boxModel['box' + property + 'Top'] + boxModel['box' + property + 'Bottom'] === boxModel['box' + property + 'Left'] + boxModel['box' + property + 'Right']) && (leftAndRightMatch && topAndBottomMatch);

			if ( allMatch ) {
				return boxModel['box' + property + 'Top'] + 'px;\n';
			} else if ( topAndBottomMatch && leftAndRightMatch ) {
				return boxModel['box' + property + 'Top'] + 'px ' + boxModel['box' + property + 'Left'] + 'px;\n';
			} else if ( topAndBottomNoMatch && leftAndRightMatch ) {
				return boxModel['box' + property + 'Top'] + 'px ' + boxModel['box' + property + 'Left'] + 'px ' + boxModel['box' + property + 'Bottom'] + 'px;\n';
			} else {
				return boxModel['box' + property + 'Top'] + 'px ' + boxModel['box' + property + 'Right'] + 'px ' + boxModel['box' + property + 'Bottom'] + 'px ' + boxModel['box' + property + 'Left'] + 'px;\n';
			}
		},
		generateCode: function(){
			var boxCode;

			boxCode  = '.box {\n';

			if ( boxModel.boxSizing === 'border-box' ) {
				boxCode += '    -moz-box-sizing: border-box;\n';
				boxCode += '         box-sizing: border-box;\n';
				boxCode += '\n';
			}

			boxCode += '    width: <span contenteditable type="number" pattern="[0-9]{1,3}">' + boxModel.boxWidth + '</span>px;\n';
			boxCode += '    height: ' + boxModel.boxHeight + 'px;\n';

			boxCode += '    margin: ' + boxModel.generateShorthand('Margin');
			boxCode += '    padding: ' + boxModel.generateShorthand('Padding');
			boxCode += '    border-width: ' + boxModel.generateShorthand('Border');

			boxCode += '\n';
			boxCode += '    /* border-style and border-color must\n';
			boxCode += '       be set for border-width to apply */\n';
			boxCode += '}';

			$('#boxCode').html(boxCode);
		},
		showPropertyOnHover: function(){
			$('.box-property').hover(function(){
				$('.box-inner').attr('data-hover-property', $(this).attr('data-property'));
			});
		},
		positionBoxProperties: function(){
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

			var boxWidth = boxModel.boxSizing === 'border-box' ? boxModel.boxWidth - boxPaddingLeftRight - boxBorderLeftRight : boxModel.boxWidth;
			var boxHeight = boxModel.boxSizing === 'border-box' ? boxModel.boxHeight - boxPaddingTopBottom - boxBorderTopBottom : boxModel.boxHeight;

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
				'data-width': $('#boxWidth').val(),
				'data-height': $('#boxHeight').val()
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

			$('#generatedWidth').text(boxBorderWidth);
			$('#generatedHeight').text(boxBorderHeight);

			boxModel.generateCode();
			boxModel.addDimensionsToModel();
		}
	};

	boxModel.prependElements();

});
