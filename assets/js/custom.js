/******** custom.js | JavaScript file *********/


// var $rows = $('#table tr');

// $('#search').keyup(function() {

//     var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
//         reg = RegExp(val, 'i'),
//         text;

//     $rows.show().filter(function() {
//         text = $(this).text().replace(/\s+/g, ' ');
//         return !reg.test(text);
//     }).hide();
// });


$(document).ready(function() {
    $('.search').on('keyup', function() {
        var searchTerm = $(this).val().toLowerCase();
        $('#dataTable tbody tr').each(function() {
            var lineStr = $(this).text().toLowerCase();
            if (lineStr.indexOf(searchTerm) === -1) {
                $(this).hide();
            }else {
                $(this).show();
            }
        });
    });
});
