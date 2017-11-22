/******** custom.js | JavaScript file *********/

//A fuction used for the search bar
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


// //Grabs the date to be placed in a new URL entry
// var today = moment().format('YYYY-MM-DD');
// document.getElementById("todayDate").value = today;




