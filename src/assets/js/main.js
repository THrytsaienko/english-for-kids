$('#collapse1').on('shown.bs.collapse', function () {
    $('#icon-down').removeClass('fa-angle-down').addClass('fa-angle-up');
});

$('#collapse1').on('hidden.bs.collapse', function () {
    $('#icon-down').removeClass('fa-angle-up').addClass('fa-angle-down');
});