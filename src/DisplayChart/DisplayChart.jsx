import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3';
import './DisplayChart.css'
import { Button } from 'react-bootstrap';



export default function DisplayChart() {
  const intialData = [
    {
      day: 'mon',
      price: 5,
    },
    {
      day: 'tue',
      price: 10
    },
    {
      day: 'wed',
      price: 4,
    },
    {
      day: 'thu',
      price: 7,
    },
    {
      day: 'fri',
      price: 4,
    },
  ];
  const svgwidth = 800;
  const svgheight = 400;
  const svgpadding = 20;
  const maxValue = 20;


  const [marketData, setMarketData] = useState(intialData)
  const svgRef = useRef()

  const newMarketData = () => marketData.map((data) => {
    data.price = Math.ceil(Math.random() * (maxValue + 1));
    return data
  })
  useEffect(() => {
    var d3Color = d3.schemeCategory10;
    var svg = d3.select(svgRef.current)
    var ChartArea = { width: svgwidth - svgpadding - svgpadding, height: svgheight - svgpadding - svgpadding }

    // ----------------------horizontal and vertical represtation---------------
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(marketData, function (d, i) { return d.price })])
      .range([ChartArea.height, 0])
      .nice();
    var xScale = d3.scaleBand()
      .domain(marketData.map(function (d) { return d.day }))
      .range([0, ChartArea.width])
      .padding(.2);

    // ---------------x-Axis for chart--------------
    d3.select("#xaxis").remove()
    svg.append('g')
      .classed("xAxis", true)
      .attr('id', 'xaxis')
      .attr('transform', 'translate(' + svgpadding + ',' + (ChartArea.height + svgpadding) + ')')
      .call(d3.axisBottom(xScale))

    // ---------------Y-Axis for chart--------------
    d3.select("#yaxis").remove()
    svg.append('g')
      .classed("yAxis", true)
      .attr('id', 'yaxis')
      .attr('transform', 'translate(' + svgpadding + ',' + svgpadding + ')')
      .call(d3.axisLeft(yScale))

    // --------------designing chart----------------
    d3.select('#newRect').remove()
    var chartBar = svg.append('g')
      .attr('transform', 'translate(' + svgpadding + ',' + svgpadding + ')')
      .attr('id', 'newRect')
    chartBar.selectAll('rect').data(marketData).enter()
      .append("rect")
      .attr('width', xScale.bandwidth())
      .attr('height', function (d, i) {
        return ChartArea.height - yScale(d.price)
      })
      .attr("x", function (d, i) {
        return xScale(d.day)
      })
      .attr("y", function (d, i) {
        return yScale(d.price)
      })
      .attr("fill", function (d, i) {
        return d3Color[i]
      })
  }, [marketData])

  return (
    <div className="displayChart" style={{
      backgroundImage: "url('Image/ChartBackground.png')",
      height: '100vh',
      width:'100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <h2 style={{ color: 'green' }}>RANDOM STOCK PRICE</h2>
      <div className='displayChart-section'>
        <svg id="chart" ref={svgRef} width={svgwidth} height={svgheight}>
        </svg>
      </div>
      <Button className="refresh-btn" type="button" onClick={() => setMarketData(newMarketData())} >Refresh</Button>
    </div>
  )
}
