import React, { Fragment } from 'react';

import Heading from '../components/heading';
import Text from '../components/text';

const PrivacyPolicy = () => (
    <Fragment>
        <Heading order={2}>Privacy notice</Heading>
        <Text>
            My website may be used without entering personal information.
            Different rules may apply to certain services on my site, however,
            and are explained separately below. Information is considered
            personal if it can be associated exclusively to a specific natural
            person. The legal framework for data protection may be found in the
            German Federal Data Protection Act (BDSG) and the Telemedia Act
            (TMG). The provisions below serve to provide information as to the
            manner, extent and purpose for collecting, using and processing
            personal information.
        </Text>
        <Text>
            Please be aware that data transfer via the internet is subject to
            security risks and, therefore, complete protection against
            third-party access to transferred data cannot be ensured.
        </Text>
        <Heading order={3}>Information/Cancellation/Deletion</Heading>
        <Text>
            On the basis of the Federal Data Protection Act, you may contact my
            at no cost if you have questions relating to the collection,
            processing or use of your personal information, if you wish to
            request the correction, blocking or deletion of the same, or if you
            wish to cancel explicitly granted consent. Please note that you have
            the right to have incorrect data corrected or to have personal data
            deleted, where such claim is not barred by any legal obligation to
            retain this data.
        </Text>
        <Heading order={3}>Cookies</Heading>
        <Text>
            There are no cookies here. Seriously, not even any analytics script is used.
        </Text>
    </Fragment>
);

export default PrivacyPolicy;
