import * as React from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

import { Repo } from "../@types/graphql";
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { gridGap, maxWidth } from "../components/style-constants";
import getQueryData from "../helpers/query-data";
import getRepos from "../helpers/get-repos";

interface Props {
  children: React.ReactNode;
  language: string;
  time: number;
  dark: boolean;
  repos: Repo[];
}

function TrendsApp(props: Props) {
  const { time: initTime, language: initLanguage, dark, repos } = props;

  const [time, setTime] = React.useState(initTime);
  const [language, setLanguage] = React.useState(initLanguage);

  const { data } = useQuery(["repos", { language, time }], getRepos, {
    initialData: repos,
    // refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  return (
    <Hero style={{ backgroundColor: dark ? "#303030" : "#f4f3f4" }}>
      <Navbar
        time={time}
        language={language}
        setTime={setTime}
        setLanguage={setLanguage}
        dark={dark}
      />

      <Container>
        <Row>
          {data.length > 0
            ? data.map((r, i) => <Card key={i} repo={r} dark={dark} />)
            : "Rate limit exceeded, try again in a moment"}
        </Row>

        <Footer dark={dark} />
      </Container>
    </Hero>
  );
}

export async function getServerSideProps({ query }: any) {
  const { language = null, time = null, dark = null } = getQueryData(query);

  const repos = await getRepos(language, time);

  return {
    props: {
      time,
      language,
      dark,
      repos
    }
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Hero = styled.div`
  width: 100%;
  color: #333;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (prefers-color-scheme: dark) {
    background: #303030 !important;
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const Row = styled.div`
  display: grid;
  margin: 2rem auto;
  grid-template-columns: repeat(
    auto-fit,
    minmax(calc(30rem - ${gridGap}), 1fr)
  );
  grid-gap: ${gridGap};
  padding: 0 ${gridGap};
  padding-bottom: 5rem;
  width: 100%;
  margin-top: 2rem;
  max-width: ${maxWidth};

  @media (max-width: 767px) {
    margin-top: 0;
    padding: ${gridGap};
  }
`;

export default TrendsApp;
