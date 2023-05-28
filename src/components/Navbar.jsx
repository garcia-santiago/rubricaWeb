import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate=useNavigate()
    const cerrarsesion=()=>{
        auth.signOut()
        .then(()=>{
            navigate('/login')
        })
    }
  return (
    <div className='navbar navbar-dark bg-dark'>
        <Link className='navbar-brand' to="/">Unicosta</Link>
        <div className='d-flex'>
            <Link className='btn btn-dark' to="/">Inicio</Link>
            
            {
                props.firebaseUser !==null ?
                (<Link className='btn btn-dark' to="/admin">Admin</Link>):
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