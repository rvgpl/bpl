import React from 'react';
import renderer from 'react-test-renderer';
import Header from "../components/header";


  it('Header Component', () => {
    const component = renderer.create(<Header />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
