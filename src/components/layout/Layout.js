import React from "react";
import AddPageButtonGroup from "../layout/AddPageButtonGroup";
import ListPageButtonGroup from "../layout/ListPageButtonGroup";

function Layout(props) {
  const { title, page, error, sku, name, price, type, attributes, children } =props;
  return (
    <>
      <header>
        <h1>{title}</h1>
        {page === "list" && <ListPageButtonGroup />}
        {page === "add" && (
          <AddPageButtonGroup
            error={error}
            sku={sku}
            name={name}
            price={price}
            type={type}
            attributes={attributes}
          />
        )}
      </header>
      <main>{children}</main>
      <footer>Scandiweb test assignement</footer>
    </>
  );
}

export default Layout;
