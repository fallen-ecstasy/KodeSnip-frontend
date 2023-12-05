import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div className="navbar-bottom navbar-expand-lg">
            <div className="footer-text">
                <p>Created by <Link to="https://www.linkedin.com/in/iamharshmisra/">Harsh Misra</Link>.</p>

                <p>Copyright © 2022. All rights Reserved</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
