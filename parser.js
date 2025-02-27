// function to create iframe and result
function makeIt(newWindow){

  // create iframe wrapper
  myFrameElement = newWindow.document.createElement('div');
	myFrameElement.setAttribute('id', 'frame');
	newWindow.document.body.appendChild(myFrameElement);

  // create iframe
	myIframe = newWindow.document.createElement('iframe');
	myIframe.src = 'IFRAME_URL';
	myFrameElement.appendChild(myIframe);
	
	// create result element
	var resultElement = newWindow.document.createElement('div');
	resultElement.setAttribute('id', 'result');
	newWindow.document.body.appendChild(resultElement);

  // start oarsing
	newWindow.copyItFunc(newWindow, myIframe, FIRST_PAGE_INT, LAST_PAGE_INT);
}

// parser function
function copyIt(newWindow, iframe, page, pageMax) {

	console.log(page, pageMax);

	// waif for iframe loaded
	iframe.onload = function () {
		// get iframe content
		var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

		// get needle element from iframe
		var elementFromIframe = iframeContent.querySelector('div.b-reader-text');

		// copy element to new window
		if (elementFromIframe) {
			newWindow.document.querySelector('#result').appendChild(elementFromIframe.cloneNode(true));
		}

    // hook last page
		if (page>=pageMax) {
			alert('Finish');
			iframe.remove();
			return;
		}

    // click next button in iframe
		iframeContent.querySelector('li.next a').click();
		page++;
		// recursive call
    newWindow.copyItFunc(newWindow, iframe, page, pageMax);
	};
}

// create new window
var newWindow = window.open('', '_blank');
// add simple DOM
newWindow.document.write('<html><head><title>Новая страница</title></head><body></body></html>');
newWindow.document.close();

// copy functions to new window
newWindow.makeItFunc = makeIt;
newWindow.copyItFunc = copyIt;

// prepare for parsing
newWindow.makeItFunc(newWindow);

