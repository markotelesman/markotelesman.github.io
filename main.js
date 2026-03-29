const forma = document.getElementById('kontakt-forma')

forma.addEventListener('submit', function(e) {
    e.preventDefault();

    const ime=document.getElementById('ime').value.trim();
    const email=document.getElementById('email').value.trim();
    const naslov=document.getElementById('naslov').value.trim();
    const poruka=document.getElementById('poruka').value.trim();

    if (!ime || !email || !naslov || !poruka) {
        alert('Molim popunite sva polja!');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Molim unesite ispravan email!');
        return;
    }

    console.log('Validacija prošla!', {ime, email, naslov, poruka});

    fetch('https://formspree.io/f/mqegpwaj', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ime, email, naslov, poruka })
})
.then(function(response) {
    if (response.ok) {
        alert('Poruka uspješno poslana!');
        forma.reset();
    } else {
        alert('Greška pri slanju, pokušajte ponovo.');
    }
})
.catch(function(error) {
    alert('Greška pri slanju, provjerite internet vezu.');
    console.log(error);
});
});