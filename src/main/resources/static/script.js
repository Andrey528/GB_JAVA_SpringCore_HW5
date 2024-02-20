var customHttpRequest = async (urlControl = '', sendingMethod, sendingData = {}) => {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: urlControl,
                type: sendingMethod,
                contentType: 'application/json',
                data: JSON.stringify(sendingData),
                success: resolve,
                error: reject
        });
    });
};

var editTask = (id) => {
    const title = $('#taskItem' + id).find('input[name="title"]').val();
    const description = $('#taskItem' + id).find('input[name="description"]').val();
    const status = $('#taskItem' + id).find('select').val();

    console.log(title);

    customHttpRequest('/tasks/' + id, 'PUT', {'title':title, 'description':description, 'status':status}).then(() => {
        // После успешного обновления данных, загрузить актуальные данные и обновить таблицу
        $('#taskItem' + id).find('input[name="title"]').val(title);
        $('#taskItem' + id).find('input[name="description"]').val(description);
        $('#taskItem' + id).find('select').val(status);
    })
    .catch((error) => {
        console.error(error);
    });
};

var deleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
        customHttpRequest('/tasks/' + id, 'DELETE').then(() => {
            // После успешного обновления данных, загрузить актуальные данные и обновить таблицу
            $('#taskItem' + id).remove();
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

$('#createTaskForm').submit((e) => {
    e.preventDefault();

    const title = $('#createTaskForm').find('input[name="title"]').val();
    const description = $('#createTaskForm').find('input[name="description"]').val();
    const status = $('#createTaskForm').find('select').val();

    customHttpRequest('/tasks', 'POST', {'title':title, 'description':description, 'status':status}).then(() => {
        // После успешного обновления данных, загрузить актуальные данные и обновить таблицу
        $.get('/tasks', (data) => {
            $('table tbody').append($(data).find('tr').last());
        });
    })
    .catch((error) => {
        console.error(error);
    });
});

var filterTask = (status) => {
    $.ajax({
        url: '/tasks/' + status,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            // Обновить таблицу с данными после фильтрации
            $('tbody').empty(); // Очистить текущие данные в таблице
            $.each(data, function(index, task) {
                $('tbody').append('<tr id="taskItem' + task.id + '"><td>' + task.id + '</td><td><input type="text" value="' +
                    task.title + '" name="title" class="form-control"></td><td><input type="text" value="' +
                    task.description + '" name="description" class="form-control"></td><td><select name="editStatus" class="form-select"><option value="' +
                    task.status + '">' + task.status + '</option></select></td><td>' + task.createdAt + '</td><td><button onclick="editTask(' + task.id +
                    ')" class="btn btn-primary">Edit</button><button onclick="deleteTask(' + task.id + ')" class="btn btn-danger">Delete</button></td></tr>');
            });
        },
        error: function(error) {
            console.error(error);
        }
    });
};
