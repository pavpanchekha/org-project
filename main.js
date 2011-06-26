$(function () {
    pageSection();
    
    if (window.location.hash) {
        $("#pages li a").filter(function () {
            return $(this).attr("href") == window.location.hash;
        }).click();
        window.location.hash = window.location.hash
    }

    $("#content").addClass("hyphenate");
    if (Hyphenator) {
        Hyphenator.run();
    }
    //$(".section h1").hide();
});

function pageSection() {
    var sections = new Array();
    $(".outline-2").each(function (i) {
        var text = $(this).find("h2").text()
        if (text) {
            text = text.trim().replace(/\[[\d/%]+\]/, "");
            sections.push({text: text, id: i});
        }
    });

    var pages = $("<ul id='pages'></ul>");
    
    for(var i=0; i < sections.length; i++) {
        var s = sections[i];
        elem = $("<li><a href='#" + s.id + "'>" + s.text + "</a></li>");
        elem.find("a").click(function() {
            el = $(this)

            $(".outline-2").hide();
            $("#pages li").removeClass("selected");
            $(".outline-2").eq($(this).attr("href").slice(1)).show();
            $("#pages li").filter(function () {
                return $(this).find("a").attr("href") == "#" + el.attr("href").slice(1)
            }).addClass("selected");
            return 0;
        });
        pages.append(elem);
    }

    $("#table-of-contents").eq(0).after(pages);

    $("#innertoc a").click(function() {
        if ($($(this).attr("href")).height() == 0) {
            var sec = $($(this).attr("href")).parent(".outline-2").find("h2").html();
            $("#pages li a").filter(function () {
                return $(this).html() == sec;
            }).click();
        }
    });

    $("#pages li a").eq(1).click();
}
