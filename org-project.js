
$(function () {
    if (!$("#pages").length) {
        pageSection();
    }

    if (window.location.hash) {
        $("a").filter(function () {
            return $(this).attr("href") == window.location.hash;
        }).each(function () {
            var id = $(this).parent(".outline-2").data("page-id");
            if (id) {
                $("$pages li a").click();
            }
        }).click();
        window.location.hash = window.location.hash
    }

    $("#content").addClass("hyphenate");
    if (window.Hyphenator) {
        window.Hyphenator.run();
    }

    $(".outline-2 h2").css({
        "fontSize": 0,
        "margin": 0,
        "padding": 0,
        "height": 0,
    });

    $(".todo, .done").parent().addClass("todo-item");
});

function pageSection() {
    var sections = new Array();

    $(".outline-2").each(function (i) {
        var text = $(this).find("h2").text();
        if (text) {
            text = text.trim().replace(/\[[\d/%]+\]/, "");
            text = text.trim().replace(/^[\d\.]\s+/, "");
            sections.push({text: text, id: i});
            $(this).data("page-id", i);
        }
    });

    var pages = $("<ul id='pages'></ul>");
    
    for(var i=0; i < sections.length; i++) {
        var s = sections[i];
        elem = $("<li><a href='#" + s.id + "'>" + s.text + "</a></li>");
        pages.append(elem);

        elem.find("a").click(function() {
            var el = $(this)
            var id = $(this).attr("href").slice(1);

            $(".outline-2").hide();
            $(".outline-2").eq(id).show();

            $("#pages li").removeClass("selected");
            $(this).parent("li").addClass("selected");
            return 0;
        });
    }

    $(".outline-2:first").before(pages);
    $("#table-of-contents").hide();
    $("#pages li a").eq(0).click();
}

$(function () {
    $(".tag").click(function () {
        var cls = $(this).find("span").attr("class");
        $(".todo-item:not(:has(." + cls + "))").parent().toggle();

        $("." + cls).parent().toggleClass("selected");
    }).addClass("clickable");
});
