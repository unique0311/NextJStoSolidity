import React from "react";
const CantoDeposit: React.FC = () => {
  const list = [
    {
      rightStatus: true,
      num: 50.12,
      percent: "1.43%",
      code: "C-394",
      btnText: "Claim Reward: 15 CANTO",
      redText: "Unstake",
    },
    {
      rightStatus: true,
      num: 792.1,
      percent: "1.43%",
      code: "C-474",
      btnText: "Claim Reward: 450 CANTO",
      redText: "Unstake",
    },
    {
      rightStatus: false,
      num: 14.33,
      percent: "",
      code: "C-902",
      btnText: "Claim Reward: 0",
      redText: "21 Days Left",
    },
  ];
  return (
    <div className="home-deposit">
      <div className="title">
        Your <p>CANTO</p> Deposits
      </div>
      <div className="hr"></div>
      <div className="card-list">
        {list.map((item) => {
          return (
            <div
              key={item.num}
              className="card-item">
              <div className="top-wrap">
                <div className="left-wrap">
                  <img
                    src="/img/home/cantoDeposit/icon1.png"
                    alt=""
                  />
                  <p>CANTO</p>
                </div>
                <div className="right-wrap">
                  <span className={item.rightStatus ? "" : "err"}></span>
                  <p>{item.rightStatus ? "Live" : "INACTIVE"}</p>
                </div>
              </div>
              <div className="cen-wrap">
                <div className="left-wrap">
                  <h3>{item.num}</h3>
                  <span>{item.percent}</span>
                </div>
                <div className="right-wrap">{item.code}</div>
              </div>
              <div className="bottom-wrap">
                <div className={`left-wrap ${item.rightStatus ? "" : "err"}`}>{item.btnText}</div>
                <div className="right-wrap">{item.redText}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CantoDeposit;
