// Deklarasi
var idArr = [];

// Menampilkan data dai API ke HTML

var dataTable = $('#example').DataTable({
    dom: 'Bfrtip',
    processing: true,
    serverSide: false,
    ajax: {
        'url' : 'http://api.wibs.sch.id/v2/meal/post/datatable.food-category',
        'type' : 'POST',
        'contentType' : "application/json",
        'dataType' : 'json',
        headers: {
            'Application-Token' : 'geSzgVahOlowulcgHEtQmu9Ybofk1lRnPFd3V5atSEu1SD1dt2'
        },
    },
    columns: [
        {
            data: 'id'
        },
        {
            data: 'name'
        },
        {
            data: 'type'
        }
    ],
    select: true
});

// POST New Data
$('#modal-new-item .submit').click(function() {
    var formData = {
        'name' : $('.nama-sayur').val(),
        'type' : $('.type-sayur').val()
    };

    // process the form
    $.ajax({
        type : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'http://api.wibs.sch.id/v2/meal/post/food-category.store', // the url where we want to POST
        data : formData, // our data object,
        dataType : 'json', // what type of data do we expect back from the server
        headers: {
            'Application-Token' : 'geSzgVahOlowulcgHEtQmu9Ybofk1lRnPFd3V5atSEu1SD1dt2'
        }
        // encode : true
    })
        // using the promise callback
        .done(function(data) {
            console.log(data);
            alert('data sudah Masuk page ini akan di reload untuk mengambil data');
            location.reload();
        })

        .fail(function(data) {
            // show any errors
            // best to remove for production
            console.log(data);
            alert( data + ' Data yg kirim Error')
        })

        
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
})


// Get class selected for Update Data
$('#example tbody').on('click', 'tr', function() {

    if( $(this).hasClass('selected') ) {
        $(this).removeClass('selected')
    } else {
        dataTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    
    var data = dataTable.row(this).data()
    $('.update').removeAttr('disabled');

    var rows = $('tr.selected')
    var idData = dataTable.row(rows).data();
    $.each($(idData), function(key, value) {
        idArr.push(value['id'])
    })
})

// Retrieve id table to modal update
$('.btn.update').click(function() {
    $('.id-group').val(idArr);
})

// Update Data
$('#modal-update-item .update').click(function() {

    var formData = {
        'id' : $('.id-group').val(),
        'name' : $('.update-nama-sayur').val(),
        'type' : $('.update-type-sayur').val()
    };

    console.log(formData)

    // process the form
    $.ajax({
        type : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'http://api.wibs.sch.id/v2/meal/post/food-category.update', // the url where we want to Update
        data : formData, // our data object,
        dataType : 'json', // what type of data do we expect back from the server
        headers: {
            'Application-Token' : 'geSzgVahOlowulcgHEtQmu9Ybofk1lRnPFd3V5atSEu1SD1dt2'
        }
        // encode : true
    })
        // using the promise callback
        .done(function(data) {
            console.log(data)
            alert('data berhasil di update & page ini akan di reload');
            location.reload();
        })

        .fail(function(data) {
            // show any errors
            // best to remove for production
            console.log(data);
            alert('Oops data yg anda masukkan gagal ' + formData)
        })

        
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
})
