import React from 'react'
import PropTypes from 'prop-types';
import * as d3selection from 'd3-selection' ;


export default class ScanningModeChart extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.plotChart();
  }

  componentDidUpdate(){
    console.log('[ScanningModeChart][componentDidUpdate]');
    this.plotChart();
  }

  generatePlotData(){
    const {bits_value, grid_config} = this.props;
    const {x_count, y_count} = grid_config;
    const x_direction = bits_value[0]?'-':'+';
    const y_direction = bits_value[1]?'+':'-';
    const adjacent_direction = bits_value[2]?'y':'x';
    const row_direction_change = bits_value[3];

    let current_x = null;
    let current_y = null;

    let current_x_direction = x_direction;
    let current_y_direction = y_direction;


    function nextX(){
      if(current_x_direction === '+'){
        if(current_x === null){
          current_x = 0;
        } else {
          current_x += 1;

          // check direction
          if(current_x === x_count){
            if(adjacent_direction === 'x' && row_direction_change){
              current_x_direction = '-';
              current_x = x_count - 1;
            } else {
              current_x = 0;
            }
          }
        }

      }else{
        if(current_x === null){
          current_x = x_count - 1;
        } else {
          current_x -= 1;

          // check direction
          if(current_x === -1){
            if(adjacent_direction === 'x' && row_direction_change){
              current_x_direction = '+';
              current_x = 0;
            } else {
              current_x = x_count - 1;
            }
          }

        }
      }
      return current_x;
    }

    function nextY(){
      if(current_y_direction === '-'){
        if(current_y === null){
          current_y = 0;
        } else {
          current_y += 1;

          // check direction
          if(current_y === y_count){
            if(adjacent_direction === 'y' && row_direction_change){
              current_y_direction = '+';
              current_y = y_count - 1;
            } else {
              current_y = 0;
            }
          }
        }

      }else{
        if(current_y === null){
          current_y = y_count - 1;
        } else {
          current_y -= 1;

          // check direction
          if(current_y === -1){
            if(adjacent_direction === 'y' && row_direction_change){
              current_y_direction = '-';
              current_y = 0;
            } else {
              current_y = y_count - 1;
            }
          }

        }
      }
      return current_y;
    }

    let grid_data = [];
    const total_count = x_count*y_count;
    for(let index=0; index<total_count; index++){
      if(adjacent_direction === 'x'){
        nextX();
        if(index % x_count === 0) {
          nextY();
        }
      } else {
        nextY();
        if(index % y_count === 0) {
          nextX();
        }
      }
      grid_data.push({
        'x': current_x,
        'y': current_y,
        'index': index
      })
    }
    return grid_data;
  }

  plotChart() {
    let svg = d3selection.select(this.refs.chart_svg);
    svg.selectAll("g").remove();
    svg.attr('height', '400px');
    svg.attr('width', '400px');
    let grid_data = this.generatePlotData();
    console.log(grid_data);

    const grid_size = 40;

    let grid_cell_data = svg.selectAll('.grid-cell').data(grid_data);

    let grid_cell_data_enter = grid_cell_data.enter();
    let grid_cell_data_enter_g = grid_cell_data_enter
      .append('g')
      .attr('class', 'grid-cell');

    grid_cell_data_enter_g.append('rect')
      .attr('height', grid_size)
      .attr('width', grid_size)
      .attr('x', function(d){
        return d.x * grid_size
      })
      .attr('y', function(d){
        return d.y * grid_size
      })
      .attr('fill', 'white')
      .attr('stroke', 'blue')
      .attr('stroke-width', '1px');

    grid_cell_data_enter_g.append('text')
      .attr('x', function(d){
        return d.x * grid_size + grid_size / 2;
      })
      .attr('y', function(d){
        return d.y * grid_size + grid_size / 2;
      })
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(function(d){
        return d.index;
      });
  }

  render(){
    return (
      <div>
        <svg ref="chart_svg" />
      </div>
    )
  }
}

ScanningModeChart.propTypes = {
  bits_value: PropTypes.array,
  grid_config: PropTypes.shape({
    x_count: PropTypes.number,
    y_count: PropTypes.number
  })
};