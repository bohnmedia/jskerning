var jsKerning = function (domObj, options) {

    "use strict";

    var kerning, parseTextNodes, modifyTextNode, setLetterSpacing;

    // MODIFY TEXT NODE
    modifyTextNode = function (node) {
        var nextIndex, kern, i, index;
		nextIndex = -1;
		kern = 1;
        for (i in options) {
            if (typeof options[i] === "number") {
                index = node.nodeValue.indexOf(i);
                if (index !== -1 && (nextIndex === -1 || index < nextIndex)) {
                    nextIndex = index;
                    kern = options[i];
                }
            }
        }
		if (nextIndex !== -1) {
			setLetterSpacing(node, nextIndex, kern);
		}
    };

    // PARSE FOR TEXT-NODES AN CALL MODIFYTEXTNODE-FUNCTION
    parseTextNodes = function (node) {
        var i;
        if (node.nodeName === "#text") {
            modifyTextNode(node);
        } else if (node.childNodes) {
            for (i = 0; i < node.childNodes.length; i += 1) {
                parseTextNodes(node.childNodes[i]);
            }
        }
    };

    // SET LETTER SPACING
    setLetterSpacing = function (node, index, kern) {
        var firstPart, letter, endPart, span;

        // GET TEXT
        firstPart = node.nodeValue.substr(0, index);
        letter = node.nodeValue.substr(index, 1);
        endPart = node.nodeValue.substr(index + 1);

        // CREATE SPAN
        span = document.createElement('span');
        span.appendChild(document.createTextNode(letter));
        span.style.letterSpacing = kern + "em";
        node.parentNode.insertBefore(span, node);

        // CREATE TEXT NODE
        node.parentNode.insertBefore(document.createTextNode(firstPart), span);

        // UPDATE TEXT NODE
        node.nodeValue = endPart;
    };

    // GO
    parseTextNodes(domObj);

};
