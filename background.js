	
	function checkForValidUrl(tabId, changeInfo, tab) {
	  // If the letter 'g' is found in the tab's URL...
	  //if (tab.url.indexOf('student_index.php') > -1) {
		if(tab.url.indexOf('grade.php') > -1 && tab.url.indexOf('t_grade.php') <= -1) {
	    // ... show the page action.
	    chrome.pageAction.show(tabId);
	  }
		if(tab.url.indexOf('student_index.php') > -1){
	    // ... show the page action.
	    chrome.pageAction.show(tabId);
	  }
	};
	
	function change(tab)
	{
		var oldurl = tab.url.toString();
		//alert(oldurl);
		var newurl = oldurl.replace(/student_index/,"grade");
		//alert(newurl);
		chrome.tabs.update(tab.id,{url:newurl});
		alert("请稍等，成绩单页面努力加载中！");
	}
	function count(tab)
	{
		//alert(tab.url);
			var major = localStorage["cc_major"];
			//alert(major);
			//major = "ime";
			if((!major) || major == "auto_detect")
				chrome.tabs.executeScript(null, {file: "content_script.js"});
			else
			{
				if(major == "cs")
					chrome.tabs.executeScript(null, {file: "major/cs.js"});
				if(major == "cis")
					chrome.tabs.executeScript(null, {file: "major/cis.js"});
				if(major == "ee")
					chrome.tabs.executeScript(null, {file: "major/ee.js"});
				if(major == "ime")
					chrome.tabs.executeScript(null, {file: "major/ime.js"});
				if(major == "chemistry")
					chrome.tabs.executeScript(null, {file: "major/chemistry.js"});
				if(major == "mate_chem")
					chrome.tabs.executeScript(null, {file: "major/mate_chem.js"});
				if(major == "app_chem")
					chrome.tabs.executeScript(null, {file: "major/app_chem.js"});
				if(major == "bio_chem")
					chrome.tabs.executeScript(null, {file: "major/bio_chem.js"});
			}
	}
	// Listen for any changes to the URL of any tab.
	chrome.tabs.onUpdated.addListener(checkForValidUrl);
	chrome.pageAction.onClicked.addListener(function(tab) {	if(tab.url.indexOf('grade.php') > -1)count(tab);else change(tab); });
