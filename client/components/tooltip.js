// WIP
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3' // update and import specific d3.mouse module
import { select as currentSelect, mouse as currentMouse } from 'd3-selection'

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentDidMount(){
    let _this = this;
    currentSelect('.overlay').on('mousemove', _this.onMouseMove)
  }

  textAttributes = {
    x: '9',
    dy: '.35em'
  }

  onMouseMove() {
    let { data } = this.props;
    let x = this.props.xScale;
    let y = this.props.yScale;
    let overlay = currentSelect('.overlay').node();
    console.log('d3.mouse', overlay)
    let x0 = this.props.xScale.invert(currentMouse(overlay));
    // let i = d3.bisectDate(data, x0, 1),
    //     d0 = data[i - 1],
    //     d1 = data[i]
    //     console.log('i', i)
    //     d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    // focus.attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.numberCompleted) + ")");
    focus.currentSelect('text').text(d.tally);
  }

  onMouseOver = () => {
    console.log('test1')
    d3.currentSelect('.focus').style('display', 'inline');
  }

  onMouseOut = () => {
    console.log('test2')
    currentSelect('.focus').style('display', 'none');
  }

  render() {
    let xScale = this.props.xScale;
    let yScale = this.props.yScale;
    return (
      <g>
        <g className="focus" style={{display: 'none'}}>
          <circle r="7.5" />
          <text x={this.textAttributes.x} dy={this.textAttributes.dy} />
        </g>
        <rect
          className="overlay"
          width={this.props.width}
          height={this.props.height}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          onMouseMove={this.onMouseMove}
          scales={{xScale, yScale}}
        />
      </g>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Tooltip)
