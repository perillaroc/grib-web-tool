export default class GridData{
  constructor(bits_value, grid_config){
    const {x_count, y_count} = grid_config;
    this.x_count = x_count;
    this.y_count = y_count;
    this.x_direction = bits_value[0]?'-':'+';
    this.y_direction = bits_value[1]?'+':'-';
    this.adjacent_direction = bits_value[2]?'y':'x';
    this.row_direction_change = bits_value[3];

    this.current_x = null;
    this.current_y = null;
    this.current_x_direction = this.x_direction;
    this.current_y_direction = this.y_direction;
  }

  nextX(){
    if(this.current_x_direction === '+'){
      if(this.current_x === null){
        this.current_x = 0;
      } else {
        this.current_x += 1;

        // check direction
        if(this.current_x === this.x_count){
          if(this.adjacent_direction === 'x' && this.row_direction_change){
            this.current_x_direction = '-';
            this.current_x = this.x_count - 1;
          } else {
            this.current_x = 0;
          }
        }
      }

    }else{
      if(this.current_x === null){
        this.current_x = this.x_count - 1;
      } else {
        this.current_x -= 1;

        // check direction
        if(this.current_x === -1){
          if(this.adjacent_direction === 'x' && this.row_direction_change){
            this.current_x_direction = '+';
            this.current_x = 0;
          } else {
            this.current_x = this.x_count - 1;
          }
        }

      }
    }
  }

  nextY(){
    if(this.current_y_direction === '-'){
      if(this.current_y === null){
        this.current_y = 0;
      } else {
        this.current_y += 1;

        // check direction
        if(this.current_y === this.y_count){
          if(this.adjacent_direction === 'y' && this.row_direction_change){
            this.current_y_direction = '+';
            this.current_y = this.y_count - 1;
          } else {
            this.current_y = 0;
          }
        }
      }

    }else{
      if(this.current_y === null){
        this.current_y = this.y_count - 1;
      } else {
        this.current_y -= 1;

        // check direction
        if(this.current_y === -1){
          if(this.adjacent_direction === 'y' && this.row_direction_change){
            this.current_y_direction = '-';
            this.current_y = 0;
          } else {
            this.current_y = this.y_count - 1;
          }
        }

      }
    }
  }

  generate(){
    let grid_data = [];
    const total_count = this.x_count*this.y_count;
    for(let index=0; index<total_count; index++){
      if(this.adjacent_direction === 'x'){
        this.nextX();
        if(index % this.x_count === 0) {
          this.nextY();
        }
      } else {
        this.nextY();
        if(index % this.y_count === 0) {
          this.nextX();
        }
      }
      grid_data.push({
        'x': this.current_x,
        'y': this.current_y,
        'index': index
      })
    }
    return grid_data;
  }
}