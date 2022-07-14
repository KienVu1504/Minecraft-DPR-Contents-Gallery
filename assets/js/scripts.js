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

$(document).ready(function () {
    var mContainer = $("#mnsry_container"),
        filterButton = $(".button");
        params = {
            itemSelector: ".item",
            filtersGroupSelector:".filters"
        };

    $(window).load(function() { 
        // Do mansonry with filtering 
        mContainer.multipleFilterMasonry(params);

        // Show articles with fadein
        mContainer.find(".item").animate({"opacity":1}, 1200);

        // Change the filtering button(label) status 
        filterButton.find("input").change(function(){
            $(this).parent().toggleClass("active");
        });
    });
});