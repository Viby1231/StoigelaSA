function toggleDropdown(dropdownId, dropdownBtnId, dropDownArrowId) {
    var dropdownContent = document.getElementById(dropdownId);
    var dropdownBtn = document.getElementById(dropdownBtnId);
    var dropDownArrow = document.getElementById(dropDownArrowId);
    
    // Toggle the dropdown content
    dropdownBtn.classList.toggle("active");
    dropdownContent.classList.toggle("show");
    dropDownArrow.classList.toggle("rotate");
    
    // Toggle the active class on the button to change font size


}



// Optional: Close all dropdowns if the user clicks outside of them
