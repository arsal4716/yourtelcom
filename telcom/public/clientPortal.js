function showMore() {
    var hiddenRows = document.getElementsByClassName('hidden');
    var button = document.querySelector('button');

    // Toggle the display of hidden rows
    for (var i = 0; i < hiddenRows.length; i++) {
        hiddenRows[i].style.display = hiddenRows[i].style.display === 'table-row' ? 'none' : 'table-row';
    }

    // Update the button text based on the current state
    var buttonText = hiddenRows[0].style.display === 'table-row' ? 'Show Less' : 'Show More';
    button.textContent = buttonText;
}
