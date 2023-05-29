import React from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate=useNavigate()
    const cerrarsesion=()=>{
        auth.signOut()
        .then(()=>{
            navigate('/login')
        })
    }

    React.useEffect(()=>{
        const obtenerDatos=async()=>{
          try {
            const data=await db.collection("usuarios").get()
            const admins = data.docs.filter(user => user.data().tipo == 'Admin')
            console.log(admins)
          } catch (error) {
            console.error(error);
          }
        }
        obtenerDatos()
      },[])
  return (
    <div className='navbar navbar-dark bg-dark'>
        <Link className='navbar-brand' to="/">Biblioteca Unicosta</Link>
        <div className='d-flex'>
            <Link className='btn btn-dark' to="/">Inicio</Link>
            
            {
                props.firebaseUser !==null ?
                (<Link className='btn btn-dark' to="/admin">Gestión Libros</Link>):
                null
            }
            {
                props.firebaseUser !==null ?(
                    <button className='btn btn-dark'
                    onClick={cerrarsesion}
                    >Cerrar Sesión</button>
                ):(
                    <div>
                        <Link className='btn btn-dark' to="/login">Login / Registro</Link>
                    </div>
                    
                )
            }
        </div>

    </div>
  )
}

export default Navbar