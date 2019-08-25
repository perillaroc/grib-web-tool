import React from 'react';
import styled from 'styled-components';

import ScanningModePage from '../pages/scanning_mode/scanning_mode_page';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const AppTitle = styled.h1`
   color: white
`;


export default class GribWebToolApp extends React.Component {
  render(){

    return (
      <Layout>
        <Header>
          <AppTitle>GRIB Web Tool</AppTitle>
        </Header>
        <Content>
          <ScanningModePage/>
        </Content>
        <Footer>
          Created by perillaroc
        </Footer>
      </Layout>
    )
  }
}
