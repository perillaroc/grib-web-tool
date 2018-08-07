import React from 'react'
import PropTypes from 'prop-types';
import * as d3selection from 'd3-selection' ;
import GridData from './grid_data'


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

  plotChart() {
    let svg = d3selection.select(this.refs.chart_svg);
    svg.selectAll("g").remove();
    svg.attr('height', '400px');
    svg.attr('width', '400px');
    const {bits_value, grid_config} = this.props;
    grid_data = new GridData(bits_value, grid_config);
    let grid_data = grid_data.generate();
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