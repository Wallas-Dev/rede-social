import { db } from './firebase.js';
import firebase from 'firebase';
import { useEffect, useState } from 'react';


function Post(props) {

    const [comentarios, setComentatios] = useState([])

    useEffect(() => {
        db.collection('posts').doc(props.id).collection('comentarios').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setComentatios(snapshot.docs.map((document) => {
                return { id: document.id, info: document.data() }
            }))
        });
    }, [])

    function comentar(id, e) {
        e.preventDefault();
        let comentarioAtual = document.querySelector('#comentario-' + id).value;

        db.collection('posts').doc(id).collection('comentarios').add({
            nome: props.user,
            comentario: comentarioAtual,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });


        document.querySelector('#comentario-' + id).value = "";
    }

    return (
        <div className='postSingle'>
            <img src={props.info.image}></img>
            <p><b>{props.info.userName}</b>: {props.info.titulo}</p>

            <div className='coments'>
                <h2>Últimos comentários:</h2>
                {
                    comentarios.map(function (val) {
                        return (
                            <div className='coment-single'>
                                <p><b>{val.info.nome}</b>: {val.info.comentario}</p>
                            </div>
                        )
                    })
                }
            </div>

            {
                (props.user)?
                <form onSubmit={(e) => comentar(props.id, e)}>
                    <textarea id={"comentario-" + props.id}></textarea>
                    <input type='submit' value='Comentar'></input>
                </form>
                :<div></div>
            }

        </div>
    )
}

export default Post;