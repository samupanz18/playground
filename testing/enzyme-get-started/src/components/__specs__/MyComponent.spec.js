import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import MyComponent from '../MyComponent';
import Foo from '../Foo';

describe('<MyComponent />', () => {
    it('should render three <Foo /> components', () => {
        const wrapper = shallow(<MyComponent />);

        expect(wrapper.find(Foo)).to.have.length(3);
    });

    it('should render an `.icon-star`', () => {
        const wrapper = shallow(<MyComponent />);

        expect(wrapper.find('.icon-star')).to.have.length(1);
    });

    it('should render children when passed in', () => {
        const wrapper = shallow((
            <MyComponent>
                <div className="unique" />
            </MyComponent>
        ));

        expect(wrapper.contains(<div className="unique" />)).to.equal(true);
    });

    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
        wrapper.find('button').simulate('click');
        expect(onButtonClick.calledOnce).to.equal(true);
    });
});
