function init() {
    createTable('#target', tableData);
    drawImg();
    drawTable();
    addEvent();
}
$(document).ready(function () {
    init();
});

var properties = ['page', 'name', 'title', 'date', 'genre'];

$.each(properties, function (i, val) {

    var orderClass = '';

    $("#" + val).click(function (e) {
        $(".content-img").slideUp();
        e.preventDefault();
        $('.filter_link.filter_link-active').not(this).removeClass('filter_link-active');
        $(this).toggleClass('filter_link-active');
        $('.filter_link').removeClass('asc desc');

        if (orderClass == 'desc' || orderClass == '') {
            $(this).addClass('asc');
            orderClass = 'asc';
        } else {
            $(this).addClass('desc');
            orderClass = 'desc';
        }

        var parent = $(this).closest('.header_item');
        var index = $(".header_item").index(parent);
        var $table = $('.table-content');
        var rows = $table.find('.table-row').get();
        var isSelected = $(this).hasClass('filter_link-active');
        var isNumber = $(this).hasClass('filter_link-number');

        rows.sort(function (a, b) {
            var x = $(a).find('.table-data').eq(index).text();
            var y = $(b).find('.table-data').eq(index).text();

            if (isNumber == true) {
                if (isSelected) {
                    return x - y;
                } else {
                    return y - x;
                }
            } else {
                if (isSelected) {
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                } else {
                    if (x > y) return -1;
                    if (x < y) return 1;
                    return 0;
                }
            }
        });
        $.each(rows, function (index, row) {
            $table.append(row);
        });
        return false;
    });
});


const iframeTemplate = ({src, width, height}) => {
    return `<iframe type="text/html" style="width:90%;" width="${width}" height="${height}" src="${src}" frameborder="0"></iframe>`;
}

const imageTemplate = ({src, width, height, alt}) =>{
    return `<img src = "${src}" width="${width}" height="${height}" alt="${alt}" />`;
}

for (var i = 0; i < imageData.length; i++) {
    if (imageData[i].class === 'video') {
        imageData[i].innerHTML = iframeTemplate(imageData[i]);
    } else {
        imageData[i].innerHTML = imageTemplate(imageData[i]);
    }
}

function createTable(target, tableData) {
    const targetId = $(target);
    tableData.forEach(function (item) {
        const row = document.createElement('div');
        row.setAttribute('class', 'table-row');
        Object.values(item).forEach(function (values) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'table-data');
            row.append(cell);
        });
        targetId.append(row);
    });
}

function drawImg() {
    var row = $(".table-row");
    var cell = $(".table-data");
    var cellhide = $(".content-img");
    var rowLng = row.length;
    var cellLng = cell.length / rowLng;
    for (var i = 0; i < rowLng; i++) {
        var cellhide = document.createElement('div');
        cellhide.setAttribute('class', 'content-img');
        cellhide.innerHTML = imageData[i].innerHTML;
        row[i].append(cellhide);
    }
}

function drawTable() {
    var row = $(".table-row");
    var cell = $(".table-data");
    var rowLng = row.length;
    var cellLng = cell.length / rowLng;
    for(var k = 0; k < cell.length; k+=5){
        var slim1 = cell[k + 1];
        var slim2 = cell[k + 2];
        var slim3 = cell[k + 3];
        slim1.classList.add("name")
        slim2.classList.add("title")
        slim3.classList.add("year")
    }
    for (var i = 0; i < rowLng; i++) {
        for (var j = 0; j < cellLng; j++) {
            row[i].getElementsByClassName("table-data")[j].innerHTML = Object.values(tableData[i])[j];
        }
    }
}

function addEvent() {
    $(".table-row").on('click', (function () {
        $(this).find(".content-img").slideToggle("slow");
    }));
    $("img").on('click', (function () {
        var f = $('.content-img').find(this).attr("alt");
        window.open(f);
    }));
    $("h1").click(function() {
        location.reload();
    });
}