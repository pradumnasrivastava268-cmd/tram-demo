import { useEffect, useMemo, useState } from "react";

function pad(num) {
  return String(num).padStart(2, "0");
}

function formatLiveDate(date) {
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const day = pad(date.getDate());
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();

  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;

  return `${weekday} ${day} ${month} ${year} ${time}`;
}

function formatTicketDate(date) {
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const day = pad(date.getDate());
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();

  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return `${weekday} ${day} ${month} ${year} ${time}`;
}

function getExpiryDate() {
  const now = new Date();
  const expiry = new Date(now);

  expiry.setHours(2, 0, 0, 0);

  if (now >= expiry) {
    expiry.setDate(expiry.getDate() + 1);
  }

  return expiry;
}

function getCountdown(targetDate) {
  const now = new Date();
  const diff = Math.max(0, targetDate - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return { days, hrs, mins, secs };
}

export default function App() {
  const createdDate = useMemo(() => new Date(), []);
  const expiryDate = useMemo(() => getExpiryDate(), []);

  const [now, setNow] = useState(new Date());
  const [timer, setTimer] = useState(getCountdown(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
      setTimer(getCountdown(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div className="app">
      <div className="phone">
        <div className="status-bar">
          <div className="status-time">23:14</div>

          <div className="status-right">
            <div className="signal">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="wifi"></div>
            <div className="battery"></div>
          </div>
        </div>

        <div className="screen-header">
          <button className="menu">☰</button>
          <h1>My Tickets</h1>
          <div className="green-dot"></div>
        </div>

        <div className="ticket">
          <div className="ticket-top">
            <img
              src="/tram_image_top.png"
              alt="Day Student ticket header"
              className="ticket-top-full-img"
            />
          </div>

          <div className="zone-row">
            <div className="zone-left">
              <img
                src="/Map_drop_pin.png"
                alt="Map pin"
                className="map-pin-img"
              />
              <span>All Zones</span>
            </div>

            <div className="active">
              <span>Active Tickets:</span>
              <div className="circle">1/1</div>
            </div>
          </div>

          <div className="ticket-content">
            <div className="identity">
              <div className="person">
                <div className="person-head"></div>
                <div className="person-body"></div>
              </div>

              <div className="qr-image-box">
                <img src="/QR_image.png" alt="QR code" className="qr-img" />
              </div>
            </div>

            <div className="id-required">
              <img src="/id_logo.png" alt="ID icon" className="id-img" />
              <span>ID Required</span>
            </div>

            <div className="live-date">{formatLiveDate(now)}</div>

            <div className="blue-card">
              <p>Created:</p>
              <h2>{formatTicketDate(createdDate)}</h2>

              <p>Valid until:</p>
              <div className="valid-box">{formatTicketDate(expiryDate)}</div>

              <div className="group-text">
                Multiple &amp; Group ticket passengers must travel together
              </div>
            </div>

            <div className="tram-image-wrap">
              <img
                src="/tram_Image_bottom.png"
                alt="tram"
                className="tram-img"
              />
            </div>
          </div>

          <div className="timer">
            <span>{timer.days} days</span>
            <span>{timer.hrs} hrs</span>
            <span>{timer.mins} mins</span>
            <span>{timer.secs} secs</span>
          </div>

          <div className="not-valid"></div>
        </div>
      </div>
    </div>
  );
}