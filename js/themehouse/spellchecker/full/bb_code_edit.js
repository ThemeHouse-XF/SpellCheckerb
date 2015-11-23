/**
 * @author th
 */
/** @param {jQuery} $ jQuery Object */
!function($, window, document, _undefined)
{
	var Super = XenForo.BbCodeWysiwygEditor.prototype;
	
	$.extend(XenForo.BbCodeWysiwygEditor.prototype,
	{
		_superGetButtonConfig: Super.getButtonConfig,
		
		getButtonConfig: function()
		{
			buttonConfig = this._superGetButtonConfig();
			
			buttons = buttonConfig.buttons;
			buttonsCustom = buttonConfig.buttonsCustom;

			buttons.push(['spellchecker']);
			
			buttonsCustom.spellchecker = {
				title: this.getText('th_check_spelling_spellchecker'),
				callback: $.context(this, 'checkSpelling'),
				className: 'icon spellchecker'
			};
			
			return {
				buttons: buttons,
				buttonsCustom: buttonsCustom
			};
		},
		
		_superWysiwygToBbCode: Super.wysiwygToBbCode,
		
		wysiwygToBbCode: function(ed)
		{
			if (this.spellChecker) {
				this.spellChecker.destroy();
				this.spellChecker = null;
				this.api.setBtnInactive('spellchecker');
			}
				
			return this._superWysiwygToBbCode(ed);
		},
	
		checkSpelling: function()
		{
			var api = this.api,
			$ed = api.$editor;
			
			if (!this.spellChecker) {
				this.spellChecker = new $.SpellChecker($ed, {
					lang: api.$editor.data('spellcheckerlang'),
					parser: 'html',
					webservice: {
						path: api.$editor.data('spellcheckerpath'),
						driver: 'PSpell'
					},
					suggestBox: {
						appendTo: document.body
					},
				    local: {
				        requestError: this.getText('th_request_error_spellchecker'),
				        ignoreWord: this.getText('th_ignore_word_spellchecker'),
				        ignoreAll: this.getText('th_ignore_all_spellchecker'),
				        ignoreForever: this.getText('th_add_to_dictionary_spellchecker'),
				        loading: this.getText('th_loading_spellchecker'),
				        noSuggestions: this.getText('th_no_suggestions_spellchecker')
				    },
				    getText: this.getTextFromNode.bind(this)
				});
			   
				// Bind spellchecker handler functions
				this.spellChecker.on('check.success', function() {
					// There are no incorrectly spelt words
				});
				
				this.suggestBox = this.spellChecker.suggestBox;
				
				var SuperSuggestBox = this.suggestBox;
				
				$.extend(this.suggestBox, {					
					_superPosition: SuperSuggestBox.position,
					
					position: function() {
						this._superPosition();

						$iframe = api.$box.find('iframe').first();

						var self = this,
							hideCallback = function() {
							setTimeout(function() {
								self.container.fadeOut(100, function(){
									self.footer.hide();
								    }.bind(self));
							}, 200);
						};
	
						$(document).on('scroll', hideCallback);
						$iframe.contents().on('scroll', hideCallback);
						$(window).on('orientationchange resize', hideCallback);

						$targetOver = api.$box;
						offset = $targetOver.offset();
						
						$toolbar = api.$box.find('.redactor_toolbar').first();
						
						var top = offset.top + $toolbar.height() - $iframe.contents().scrollTop() + 2;
						var left = offset.left;
						
						if (this.wordElement) {
							wordOffset = this.wordElement.offset();
							top += wordOffset.top + this.wordElement.height();
							left += wordOffset.left;
						}
						
						this.container.css({ top: top, left: left });
					},
					
					_superShowSuggestedWords: SuperSuggestBox.showSuggestedWords,
					
					showSuggestedWords: function(getWords, word, wordElement) {
						this._superShowSuggestedWords(getWords, word, wordElement);
						
						this.wordElement = wordElement;
					}
				});
				
				this.spellChecker.check();
				api.setBtnActive('spellchecker');
			} else {
				this.spellChecker.destroy();
				this.spellChecker = null;
				api.setBtnInactive('spellchecker');
			}
		},
		
		getTextFromNode: function(node) {
			if (node.nodeType === 3) {
				return node.data;
			}
			
			var txt = '';
			
			if (!!(node = node.firstChild)) do {
				var wordBreakingNode = (node.tagName === 'P' || node.tagName === 'LI');
				txt += ((wordBreakingNode ? ' ' : '') + this.getTextFromNode(node));
			} while (!!(node = node.nextSibling));
			
			return txt;
		}
	});
}
(jQuery, this, document);