import { useAuth } from '../../context/AuthContext'

function Credits() {
    const {credits, isLoggedIn} = useAuth();

  return (

    <>
        {isLoggedIn && <div className='credits'> {`Free Credits - ${credits}`} </div>}
    
    </>
  )
}

export default Credits