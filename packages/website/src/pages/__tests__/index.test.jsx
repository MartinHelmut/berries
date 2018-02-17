import React from 'react';
import { shallow } from 'enzyme';

import Index from '../index';
import Text from '../../components/text';

describe('pages/index', () => {
    test('renders hello world', () => {
        const wrapper = shallow(<Index />);
        expect(wrapper.find(Text)).toHaveLength(1);
    });
});
