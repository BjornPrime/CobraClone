import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Col, Nav, NavLink, Row } from 'reactstrap';

import CurveAnalysis from './components/CurveAnalysis';
import DynamicFlash from './components/DynamicFlash';
import MulticoloredAnalysis from './components/MulticoloredAnalysis';
import TypeAnalysis from './components/TypeAnalysis';

class CubeAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nav: 'curve',
    };
  }

  select(nav) {
    this.setState({ nav });
  }

  render() {
    const { curve, typeByColor, multicoloredCounts } = this.props;
    const active = this.state.nav;
    let navItem = (nav, text) => (
      <NavLink active={active === nav} onClick={this.select.bind(this, nav)} href="#">
        {text}
      </NavLink>
    );
    return <>
      <DynamicFlash />
      <Row className="mt-3">
        <Col xs="12" lg="2">
          <Nav vertical="lg" pills className="justify-content-sm-start justify-content-center mb-3">
            {navItem('curve', 'Curve')}
            {navItem('type', 'Type Breakdown')}
            {navItem('multi', 'Multicolored Counts')}
          </Nav>
        </Col>
        <Col xs="12" lg="10">
          {{
            curve: <CurveAnalysis curve={curve} />,
            type: <TypeAnalysis typeByColor={typeByColor} />,
            multi: <MulticoloredAnalysis multicoloredCounts={multicoloredCounts} />,
          }[active]}
        </Col>
      </Row>
    </>;
  }
}

const curve = JSON.parse(document.getElementById('curveData').value);
const typeByColor = JSON.parse(document.getElementById('typeData').value);
const multicoloredCounts = JSON.parse(document.getElementById('multicolorData').value);
const wrapper = document.getElementById('react-root');
const element = <CubeAnalysis curve={curve} typeByColor={typeByColor} multicoloredCounts={multicoloredCounts} />;
wrapper ? ReactDOM.render(element, wrapper) : false;
