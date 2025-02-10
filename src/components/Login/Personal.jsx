export function Personal() {
  function Years() {
    var year = 2024;
    var dbYear = [];

    for (let i = 0; i <= 100; i++) {
      dbYear.push({ year: year - i });
    }

    return dbYear.map((yearObj) => (
      <option key={yearObj.year} value={yearObj.year}>
        {yearObj.year}
      </option>
    ));
  }

  function Day() {
    var dbDay = [];

    for (let i = 0; i <= 30; i++) {
      dbDay.push({ day: i + 1 });
    }

    return dbDay.map((yearObj) => (
      <option key={yearObj.day} value={yearObj.day}>
        {yearObj.day}
      </option>
    ));
  }

  return (
    <>
      <div className="panelLoginButtonNewUserTop">
        <input className="inputLogin" type="text" placeholder="Name" />
        <div className="LoginSeparator"></div>
        <input className="inputLogin" type="text" placeholder="Last name" />
      </div>
      <p
        style={{
          color: "#0b2130",
          margin: "0px",
          marginTop: "6px",
          marginRight: "auto",
          fontWeight: "bold",
        }}
      >
        Birthdate
      </p>
      <div className="panelLoginButtonNewUserTop">
        <select id="day">
          <Day></Day>
        </select>
        <div style={{ width: "24px" }}></div>

        <select>
          <option value="1">January </option>
          <option value="2">February </option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <div style={{ width: "24px" }}></div>

        <select>
          <Years />
        </select>
      </div>

      <input className="inputLogin" type="text" placeholder="Email" />
      <input className="inputLogin" type="text" placeholder="Password" />
    </>
  );
}
