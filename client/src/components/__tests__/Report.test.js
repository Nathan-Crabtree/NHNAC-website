// Report.test.js
import React from 'react';
import { shallow, mount } from 'enzyme';

// Import functions
import Report from '../Report';

// Report render testing
it('renders without crashing', () => {
    shallow(<Report />);
});

// onSubmit testing
describe('onSubmit Test', () => {
    const props = {
        className: 'Foo'
    };

    it('Submit works', () => {
        const component = mount(<Report {...props} />);
        const modalForm = component.find('.modal_form').at(0);
        expect(modalForm.html()).toBe('<form class=\"modal_form report_form\"><h2 class=\"newsletter_h2\">Report</h2><fieldset><div class=\"feedback_form_fields\"><label class=\"report_label\" for=\"type\">Choose your report type</label><br><div class=\"report_radio\"><input type=\"radio\" id=\"spam\" name=\"type\" value=\"spam\"><label for=\"spam\">Spam</label><br></div><div class=\"report_radio\"><input type=\"radio\" id=\"child_abuse\" name=\"type\" value=\"child_abuse\"><label for=\"child_abuse\">Child Abuse</label><br></div><div class=\"report_radio\"><input type=\"radio\" id=\"bullying\" name=\"type\" value=\"bullying\"><label for=\"bullying\">Bullying or Harassment</label><br></div><div class=\"report_radio\"><input type=\"radio\" id=\"violence\" name=\"type\" value=\"violence\"><label for=\"violence\">Violent Threats</label><br></div></div><button id=\"submit\" class=\"submit_btn submit_padding\" type=\"submit\">Submit</button></fieldset></form>');
    });
});