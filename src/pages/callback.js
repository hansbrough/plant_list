import React from "react"
import { Link } from "gatsby"
import { logout } from "../utils/auth"

const Callback = () => {
return(
<>
  <p>Callback</p>
  <nav>
    <Link to="/app/stock">Stock</Link>{" "}
    <a
      href="#logout"
      onClick={e => {
            logout()
            e.preventDefault()
      }}
    >
      Log Out
    </a>
  </nav>
</>
)}

export default Callback
