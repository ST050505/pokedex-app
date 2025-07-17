$(document).ready(function () {
    $('.delete-type').on('click', function (e) {
        e.preventDefault();
        const form = $(this).closest('form');
        if (confirm('Are you sure you want to delete this type?')) {
            form.submit();
        }
    });
});