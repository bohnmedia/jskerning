var jskerning = function (domObj) {

    "use strict";

    // KERNING-SETTINGS
    var kerning = {
        'Te': -0.15,
        'To': -0.15
    };

    // PARSE FOR TEXT-NODES AN CALL MODIFYTEXTNODE-FUNCTION
    var parseTextNodes = function (node) {
        if (node.nodeName == "#text") {
            modifyTextNode(node);
        } else if (node.childNodes) {
            for (var i = 0; i < node.childNodes.length; i++) {
                parseTextNodes(node.childNodes[i]);
            }
        }
    };

    // MODIFY TEXT NODE
    var modifyTextNode = function (node) {
		var nextIndex = -1;
		var kern = 1;
        for (var i in kerning) {
            var index = node.nodeValue.indexOf(i);
            if ( index !== -1 && ( nextIndex == -1 || index < nextIndex ) ) {
				nextIndex = index;
				kern = kerning[i];
            }
        }
		if ( nextIndex !== -1 ) {
			setLetterSpacing(node, nextIndex, kern);
		}
    }

    // SET LETTER SPACING
    var setLetterSpacing = function (node, index, kern) {
        // GET TEXT
        var firstPart = node.nodeValue.substr(0, index);
        var letter = node.nodeValue.substr(index, 1);
        var endPart = node.nodeValue.substr(index + 1);

        // CREATE SPAN
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(letter));
        span.style.letterSpacing = kern + "em";
        node.parentNode.insertBefore(span, node);

        // CREATE TEXT NODE
        node.parentNode.insertBefore(document.createTextNode(firstPart), span);

        // UPDATE TEXT NODE
        node.nodeValue = endPart;
    }

    // GO
    parseTextNodes(obj);

}
