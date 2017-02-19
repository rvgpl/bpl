import React from 'react';
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import Error from "../pages/_error";

it('Error text exists', () => {
    const app = shallow(
      <Error />
    )
    expect(app.find('h1').exists());
  })

it('Error renders', () => {
  const component = renderer.create(<Error />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
