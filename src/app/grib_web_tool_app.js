import React from 'react';
import ScanningModePage from '../pages/scanning_mode/scanning_mode_page';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


export default class GribWebToolApp extends React.Component {
  render(){
    return (
      <Layout>
        <Header>
          <h1>GRIB Web Tool</h1>
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