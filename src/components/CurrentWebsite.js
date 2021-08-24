import React from "react";
import { Typography, Image } from "antd";

const CurrentWebsite = ({ info = {} }) => {
  return (
    <>
      <Image src={info.favIconUrl} width={50} />
      <Typography.Text style={{ color: "#fff" }}>{info.title}</Typography.Text>
      <Typography.Text style={{ color: "#fff", fontSize: 14 }}>
        {info.url}
      </Typography.Text>
    </>
  );
};

export default React.memo(CurrentWebsite);
