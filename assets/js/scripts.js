window.onscroll = function() {
    resizeNavbar();
    scrollFunction();
};

var header = document.getElementById("stickyHeader");
var n_navbar_homelink = document.getElementById("n_navbar_home-link");
var n_navbar_homeicon = document.getElementById("n_navbar_home-icon");
var sticky = header.offsetTop;

function resizeNavbar() {
    if (window.pageYOffset > sticky) {
        n_navbar_homeicon.classList.add("n_navbar_home-icon-small");
        n_navbar_homelink.classList.add("n_navbar_home-link-small");
        header.classList.add("sticky");
    } else {
        n_navbar_homeicon.classList.remove("n_navbar_home-icon-small");
        n_navbar_homelink.classList.remove("n_navbar_home-link-small");
        header.classList.remove("sticky");
    }
}

var mybutton = document.getElementById("myBtn");
var mybutton1 = document.getElementById("myBtn1");
var mybutton2 = document.getElementById("myBtn2");

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.right = "0px";
        mybutton1.style.right = "0px";
        mybutton2.style.right = "0px";
    } else {
        mybutton.style.right = "-70px";
        mybutton1.style.right = "-90px";
        mybutton2.style.right = "-100px";
    }
}

function addClassAll(el, cls){
	for (var i = 0; i < el.length; ++i){
		if (!el[i].className.match('(?:^|\\s)'+cls+'(?!\\S)')){
			el[i].className += ' '+cls; 
		} 
	}
}

function delClassAll(el, cls){
	for (var i = 0; i < el.length; ++i){
		el[i].className = el[i].className.replace(
			new RegExp('(?:^|\\s)'+cls+'(?!\\S)'),''
		);
	}
}

function contentFilter(filterID, filterType){  
	var id = filterID;
	document.querySelector(id+' .filter-categories').onclick = function(evt) { 
		evt = evt || window.event;

		var elem = evt.target || evt.srcElement, 
		    wrap = document.querySelectorAll(id+' .filter-wrap'),
		    items = document.querySelectorAll(id+' .filter-item'),
		    inputs = document.querySelectorAll(id+' .filter-input'),
		    filters = [],
		    noitem = document.querySelectorAll(id+' .filter-no-item'),
		    type = filterType;

		if (elem.className.match('(?:^|\\s)filter-all(?!\\S)')) { // #filter-all
			for (var i = 1; i < inputs.length; ++i) { // loop through inputs but ignore [0] - #filter-all
				inputs[i].checked = false; // uncheck all other inputs
			}

			setTimeout(function() { 
				delClassAll(items, 'selected');  
				delClassAll(wrap, 'filtered-'+type); 
				delClassAll(noitem, 'filter-no-item-active');
			}, 500); 
		} else { // another filter is checked
			inputs[0].checked = false; // uncheck #filter-all
			for (var i = 1; i < inputs.length; ++i) { // loop through inputs but ignore [0] - #filter-all
				if (inputs[i].checked) { 
					filters.push(inputs[i].id); 
				} // add checked inputs to filters array 
			}

			setTimeout(function() { 
				delClassAll(items, 'selected'); 
				addClassAll(wrap, 'filtered-'+type);  

				if (type == 'inclusive') {
					if (filters.length > 0) {
						addClassAll(document.querySelectorAll(id+' .filter-item.'+filters.join('.')), 'selected');
					} // build css selector from filters array
					// document.querySelectorAll(id+' .selected').length == 0 ? addClassAll(noitem, 'filter-no-item-active') : delClassAll(noitem, 'filter-no-item-active'); 

					if(document.querySelectorAll(id+' .selected').length == 0){
						addClassAll(noitem, 'filter-no-item-active')
						addClassAll(wrap, 'filter-wrap-1')
					} else {
						delClassAll(noitem, 'filter-no-item-active');
						delClassAll(wrap, 'filter-wrap-1');
						addClassAll(wrap, 'filter-wrap')
					}
				} 

				var checkCount = 0;  

				for (var i = 0; i < inputs.length; ++i) {
					checkCount += inputs[i].checked ? 1 : 0; 
				}

				if (checkCount == 0) {
					inputs[0].checked = true;
				}

				if (inputs[0].checked) {
					delClassAll(wrap, 'filtered-'+type);
					delClassAll(noitem, 'filter-no-item-active');
					delClassAll(wrap, 'filter-wrap-1');
				}
			}, 500); 
		}
	}
}

contentFilter('#filter_categories_id', 'inclusive');