import React, { Fragment } from 'react';

import Heading from '../components/heading';
import Text from '../components/text';
import Address from '../components/address';

const LegalNotice = () => (
    <Fragment>
        <Heading order={2}>Legal notice</Heading>
        <Text>Information in accordance with section 5 TMG</Text>
        <Address>
            Martin Helmut Fieber<br />
            Heiligengeiststr. 14<br />
            21335 L&uuml;neburg
        </Address>
        <Heading order={3}>Contact</Heading>
        <Text>
            Telephone: +49 174 3821210<br />
            E-Mail: info@martin-fieber.de<br />
            Website: https://pick-your-berries.net<br />
        </Text>
        <Heading order={3}>Disclaimer</Heading>
        <Heading order={4}>Accountability for content</Heading>
        <Text>
            The contents of my pages have been created with the utmost care.
            However, I cannot guarantee the contents&apos; accuracy,
            completeness or topicality. According to statutory provisions,
            I&apos;m furthermore responsible for my own content on these web
            pages. In this context, please note that I&apos;m accordingly not
            obliged to monitor merely the transmitted or saved information of
            third parties, or investigate circumstances pointing to illegal
            activity. Our obligations to remove or block the use of information
            under generally applicable laws remain unaffected by this as per §§
            8 to 10 of the Telemedia Act (TMG).
        </Text>
        <Heading order={4}>Accountability for links</Heading>
        <Text>
            Responsibility for the content of external links (to web pages of
            third parties) lies solely with the operators of the linked pages.
            No violations were evident to my at the time of linking. Should any
            legal infringement become known to my, I will remove the respective
            link immediately.
        </Text>
        <Heading order={4}>Copyright</Heading>
        <Text>
            My web pages and their contents are subject to German copyright law.
            Unless expressly permitted by law (§ 44a et seq. of the copyright
            law), every form of utilizing, reproducing or processing works
            subject to copyright protection on my web pages requires the prior
            consent of the respective owner of the rights. Individual
            reproductions of a work are allowed only for private use, so must
            not serve either directly or indirectly for earnings. Unauthorized
            utilization of copyrighted works is punishable (§ 106 of the
            copyright law).
        </Text>
    </Fragment>
);

export default LegalNotice;
