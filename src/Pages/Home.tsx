import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <Card
        bordered={true}
        style={{
          width: 400,
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Title level={2}>Hello Home</Title>
      </Card>
    </div>
  );
};

export default Home;

