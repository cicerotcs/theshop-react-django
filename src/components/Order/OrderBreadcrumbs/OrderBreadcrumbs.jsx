import React from "react";

import "../OrderBreadcrumbs/OrderBreadcrumbs.scss";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

const OrderBreadcrumbs = () => {
  const breadcrumbs = [
    <Link
      to="/checkout"
      key="2"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      Cart
    </Link>,
    <Typography key="3" color="text.primary">
      Information
    </Typography>,
    <Typography key="3" color="text.primary">
      Shipping
    </Typography>,
    <Typography key="3" color="text.primary">
      Payment
    </Typography>,
  ];
  return (
    <div className="order__breadcrumb">
      <Stack spacing={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </div>
  );
};

export default OrderBreadcrumbs;
