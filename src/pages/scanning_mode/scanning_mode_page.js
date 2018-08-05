import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, Switch } from 'antd';

import ScanningModeChart from './scanning_mode_chart'


export default class ScanningModePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bits_value: [0, 0, 0, 0]
    }
  }

  handleSwitchChange(index, checked){
    let bit_values = this.state.bits_value;
    bit_values[index] = checked? 1: 0;
    this.setState({
      bits_value: bit_values
    });
  }

  render(){
    let data_matrix = [];

    for(let i=0; i<16; i++){
      data_matrix.push({
        index: i,
        row: Math.floor(i/4),
        col: i%4
      })
    }

    const bits_config_list = [
      {
        bit: 1,
        meaning: {
          '0': 'Points of first row or column scan in the +i (+x) direction',
          '1': 'Points of first row or column scan in the -i (-x) direction'
        },
      },
      {
        bit: 2,
        meaning: {
          '0': 'Points of first row or column scan in the -j (-y) direction',
          '1': 'Points of first row or column scan in the +j (+y) direction'
        },
      },
      {
        bit: 3,
        meaning: {
          '0': 'Adjacent points in i (x) direction are consecutive',
          '1': 'Adjacent points in j (y) direction is consecutive'
        },
      },
      {
        bit: 4,
        meaning: {
          '0': 'All rows scan in the same direction',
          '1': 'Adjacent rows scans in the opposite direction'
        },
      }
    ];

    const bits_value = this.state.bits_value;
    console.log('bits_value:', bits_value);
    const bits_menu = bits_config_list.map((a_bit_config, index)=>{
      const bit_value = bits_value[index];
      let switch_props = {
        checkedChildren: "1",
        unCheckedChildren: "0",
        defaultChecked: false
      };
      if(bit_value){
        switch_props['defaultChecked'] = true;
      }
      return (
        <Row key={index}>
          <Col span={2}>{a_bit_config['bit']}</Col>
          <Col span={2}><Switch {...switch_props} onChange={this.handleSwitchChange.bind(this, index)}/></Col>
          <Col span={20}>{a_bit_config['meaning'][bit_value]}</Col>
        </Row>
      )
    });

    return (
      <div>
        <h2>Scanning Mode</h2>
        <Row>
          {bits_menu}
        </Row>
        <ScanningModeChart bits_value={bits_value} grid_config={{
          x_count: 4,
          y_count: 4
        }}/>
      </div>
    )
  }
}