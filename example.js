// Example parsing https://etherscan.io/accounts/ with console output.
// Just paste this code to console and hit Enter

// function to create iframe and result
function makeIt(newWindow){

  // create iframe wrapper
  myFrameElement = newWindow.document.createElement('div');
	myFrameElement.setAttribute('id', 'frame');
	newWindow.document.body.appendChild(myFrameElement);

  // create iframe
	myIframe = newWindow.document.createElement('iframe');
	myIframe.src = 'https://etherscan.io/accounts/1';
	myFrameElement.appendChild(myIframe);
	
	// create result element
	var resultElement = newWindow.document.createElement('div');
	resultElement.setAttribute('id', 'result');
	newWindow.document.body.appendChild(resultElement);

  // start oarsing
	newWindow.copyItFunc(newWindow, myIframe, 1, 400);
}

// parser function
function copyIt(newWindow, iframe, page, pageMax) {

	console.log(page, pageMax);

	// waif for iframe loaded
	iframe.onload = function () {
		// get iframe content
		var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

		// get needle element from iframe
		var elementFromIframe = iframeContent.querySelectorAll('div#ContentPlaceHolder1_divTable table tbody tr');
        for (i=0;i<=elementFromIframe.length-1;i++){
            console.log(elementFromIframe[i].querySelectorAll('td')[1].querySelector('a').getAttribute('href').replace('/address/',''));
        }
        
    // hook last page
		if (page>=pageMax) {
			alert('Finish');
			iframe.remove();
			return;
		}

    // click next button in iframe
		iframeContent.querySelector('a.page-link.px-3[aria-label="Next"]').click();
		page++;
		// recursive call
    newWindow.copyItFunc(newWindow, iframe, page, pageMax);
	};
}

// create new window
var newWindow = window.open('', '_blank');
// add simple DOM
newWindow.document.write('<html><head><title>New page</title></head><body></body></html>');
newWindow.document.close();

// copy functions to new window
newWindow.makeItFunc = makeIt;
newWindow.copyItFunc = copyIt;

// prepare for parsing
newWindow.makeItFunc(newWindow);

