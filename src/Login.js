
function criarConta(e) {

    e.preventDefault();
    let email = document.getElementById('email-cadastro').value;
    let username = document.getElementById('username-cadastro').value;
    let senha = document.getElementById('senha-cadastro').value;

    auth.createUserWithEmailAndPassword(email, senha)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: username
            })
            alert('Conta criada com sucesso!');
            let modal = document.querySelector('.modalCriarConta');

            modal.style.display = "none";
        }).catch((error) => {
            alert(error.message);
        })
        ;


}

function abrirModalCriarConta(e) {
    e.preventDefault();

    let modal = document.querySelector('.modalCriarConta');

    modal.style.display = "block";
}

function logar(e) {
    e.preventDefault();
    let email = document.getElementById('email-login').value;
    let senha = document.getElementById('senha-login').value;

    auth.signInWithEmailAndPassword(email, senha)
        .then((auth) => {
            props.setUser(auth.user.displayName);
            window.location.href = "/";

        }).catch((err) => {
            alert(err.message);
        })

}