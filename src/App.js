import React from "react";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Listele />
          </Route>
          <Route path="/ekle">
            <Kayit />
          </Route>
          <Route path="/guncelle/:id">
            <Guncelle />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
