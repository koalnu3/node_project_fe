import React, { useState } from "react";
import Content from "../components/Content";
import Tab from "../components/Tab";
import RoundTab from "../components/RoundTab";

const ClassDetailPage = () => {
  const tabList = [
    {
      name: "클래스소개",
      link: "#",
    },
    { name: "커리큘럼", link: "#" },
    { name: "강사소개", link: "#" },
  ];

  const roundTabList = [
    {
      name: "헬스",
      link: "#",
    },
    { name: "필라테스", link: "#" },
    { name: "요가", link: "#" },
    { name: "암벽등반", link: "#" },
    { name: "테니스", link: "#" },
    { name: "스쿼시", link: "#" },
    { name: "배구", link: "#" },
  ];

  const roundTabList2 = [
    {
      name: "헬스",
    },
    { name: "필라테스" },
    { name: "요가" },
    { name: "암벽등반" },
    { name: "테니스" },
    { name: "스쿼시" },
    { name: "배구" },
  ];
  const [tabActive, setTabActive] = useState("");
  const [roundTabActive, setRoundTabActive] = useState("");
  const [roundTabActive2, setRoundTabActive2] = useState("");

  return (
    <Content>
      <Tab list={tabList} setTabActive={setTabActive} tabActive={tabActive} />
      <Tab
        list={tabList}
        setTabActive={setTabActive}
        tabActive={tabActive}
        tagType="button"
      />
      <RoundTab
        list={roundTabList}
        setRoundTabActive={setRoundTabActive}
        roundTabActive={roundTabActive}
        tagType="button"
      />
      <RoundTab
        list={roundTabList2}
        setRoundTabActive={setRoundTabActive2}
        roundTabActive={roundTabActive2}
      />
    </Content>
  );
};

export default ClassDetailPage;
