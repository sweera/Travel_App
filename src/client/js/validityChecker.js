function checkValidity(){
    console.log("Running checkValidity");
    const destination = document.getElementById('destination').ariaValueMax;

    if(destination == " ") {
        alert("Please enter valid city");
    } else {
        return true;
    };
};

export { checkValidity };