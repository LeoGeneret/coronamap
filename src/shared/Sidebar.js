import React, { useState } from "react";
import '../scss/sidebar.scss';

function Sidebar (props) {
  return (
    <div id="Sidebar">
      <div>
        <div className="profile">
          <div className="user">
            <div className="userImg"></div>
            <div className="userInfos">
              <div className="userName">Mathilde Jackson</div>
              <div className="userStatus">Administrateur</div>
            </div>
          </div>
          {/* <div className="Btn myAccount">Mon Compte</div> */}
        </div>
        <nav>
          {/* <NavLink exact to="/">
            <div className="icon icon-dashboard"></div>
            <p>Accueil</p>
          </NavLink> */}
          <a>
            <div className="icon icon-agents"></div>
            <p>Liste des agents</p>
          </a>
          <a>
            <div className="icon icon-planning"></div>
            <p>Les plannings</p>
          </a>
          <a>
            <div className="icon icon-hotel"></div>
            <p>Les hôtels</p>
          </a>
        </nav>
      </div>
    </div>
  )
}
export default Sidebar
