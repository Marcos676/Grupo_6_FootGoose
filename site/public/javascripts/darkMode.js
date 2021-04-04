var check = document.getElementById("cambiarModo");

    check.onclick = () => {
        document.querySelector("body").classList.toggle('active');

        if (document.querySelector("body").classList.contains('active')) {
            localStorage.setItem('darkMode', 'true')
        } else {
            localStorage.setItem('darkMode', 'false')
        }
    }

if (localStorage.getItem('darkMode') === 'true') {
    document.querySelector("body").classList.add('active');
    check.checked = 1
} else {
    document.querySelector("body").classList.remove('active');
    check.checked = 0
}