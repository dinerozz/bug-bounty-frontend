import React, { FC, ReactNode } from "react";
import Home from "@/components/pages/Home";
import { Header } from "@/components/organisms/Header";
import { Layout } from "antd";

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full mx-auto">
      <Header />
      <Layout className="w-full mx-auto bg-transparent">
        <div className="max-w-[1440px] mx-auto">{children}</div>
      </Layout>
    </div>
  );
};

export default MainLayout;
