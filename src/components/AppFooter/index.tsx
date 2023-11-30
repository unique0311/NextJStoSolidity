import React from "react";
import { Button, Input, Popover } from "antd";
import style from "./index.module.scss";
const AppFooter: React.FC = () => {
  const list = [
    {
      title: 'Policies',
      navList: [
        {
          nav: 'Disclaimer'
        },
        {
          nav: 'Privacy Policy'
        },
        {
          nav: 'Terms of Service'
        },
      ]
    },
    {
      title: 'Resources',
      navList: [
        {
          nav: 'FAQ'
        },
        {
          nav: 'Docs'
        },
      ]
    },
    {
      title: 'Resources',
      navList: [
        {
          nav: 'Contact Us'
        },
        {
          nav: 'Report a bug'
        },
      ]
    }
  ]
  return (
    <div className={style["app-footer"]}>
      <div className="con-main-wrap">
        <div className="left-logo-wrap">
          <h3>WINDFALL  <img className="logo" src="/img/common/logo.png" alt="" /></h3>
          <span>© Windfall 2023</span>
          <div className="bottom-logo">
            <img src="/img/common/footer-list1.png" alt="" />
            <img src="/img/common/footer-list2.png" alt="" />
          </div>
        </div>
        <div className="right-nav-wrap">
          {list.map((item) => (
            <div className="nav-wrap" key={item.title}>
              <p className="title">{item.title}</p>
              <div className="nav-list">
                {item.navList.map((navItem) => (
                  <span className="nav-item" key={navItem.nav}>{navItem.nav}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AppFooter;
