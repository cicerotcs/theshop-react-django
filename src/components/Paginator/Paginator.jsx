import React from "react";

import "../Paginator/Paginator.scss";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { Link } from "react-router-dom";

const Paginator = ({ page, numOfPages, keyword }) => {
  if (keyword === null) {
    keyword = "";
  }
  return (
    <div className="paginator">
      {numOfPages > 1 && (
        <Pagination
          page={page}
          count={numOfPages}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/${
                item.page === 1 ? "" : `?keyword=${keyword}&page=${item.page}`
              }`}
              {...item}
            />
          )}
        />
      )}
    </div>
  );
};

export default Paginator;
