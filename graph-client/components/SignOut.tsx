import React from 'react'

import { Auth } from "../context/auth";

const SignOut = () => {
    return Auth.currentUser && (
        <button onClick={() => Auth.signOut()} className="button user-items logined" >ログアウト</button>
    )
}

export default SignOut