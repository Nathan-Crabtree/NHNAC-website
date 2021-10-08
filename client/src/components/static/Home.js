import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slideshow } from './Static';
import Container from '../Container';
import $ from 'jquery';

export default class Home extends Component {

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);

        if (!this.props.cookiePolicyDisplayed) {
            if (this.props.isAuthenticated) {
                $(function () {
                    $('button.modal_button')[1].click();
                });
            } else {
                $(function () {
                    $('button.modal_button')[0].click();
                });
            }
            this.props.setCookiePolicyDisplayed();
        }
        if (this.props.isAuthenticated) {
            $(function () {
                $('button.modal_button')[1].style.display = "none";
            });
        } else {
            $(function () {
                $('button.modal_button')[0].style.display = "none";
            });
        }
    }

    render() {
        const {
            hands,
            homes,
            people
        } = this.props;

        return (
            <React.Fragment>
                <Container onSubmit={this.props.onSubmit} triggerText="Cookies" />
                <div className="MsoNormal center_text"><strong><span>Home</span></strong></div>
                <Slideshow hands={hands} homes={homes} people={people} />
                <p><b>Welcome!</b></p>
                <p>&emsp;We are a legally established and authorized independent
                    Native American Church that desires to protect and
                    restore to the world our religious, cultural, and personal
                    freedoms as a Native American Religious Culture.</p>
                <p>&emsp;Sadly, because of governmental monetary and political
                    whims, new laws that control and enslave the population
                    continue to &quot;creep&quot; into our legal system.  Some of these
                    new laws are classifying natural substances, like essential
                    oils, herbs, and other plants, to be illegal when used for
                    healing purposes.  Because these new laws were
                    &quot;sneaked&quot; into our legal system, many people do not
                    realize they are committing a felony every time they use
                    them.</p>
                <p><em>&emsp;For example, even a full-blooded, tribal card carrying,
                    licensed Native American massage therapist is at risk
                    of being sent to federal prison if they use therapeutic
                    essential oils on any client off their reservation. Yes,
                    this probably has never happened yet, but there have
                    been some quite strange happenings similar to this
                    when healers have taken clients away from the
                    money hungry corrupt bureaucracy of big pharma and
                    the medical establishment.</em></p>
                <p>&emsp;So, once again we see another step to take away our
                    God-given freedoms.  Also, for thousands of years, native
                    plants such as peyote, ayahuasca, and many others that
                    have been used by the Native American peoples are now
                    deemed to be illegal for personal use. Now the federal
                    government says these government-controlled healing
                    modalities can only be used in bona fide exempted Church
                    Ceremonies.</p>
                <p><b>&emsp;Because of the many losses of freedoms, many people
                    and Natural Healers ask, “What can we do?”</b></p>
                <p>&emsp;Looking to protect their God-given freedoms, most people
                    will run out to join a religious organization in hopes that it
                    will offer some legal protection. Sadly, because of the
                    court cases where judges have dictated peoples’ religious
                    beliefs and the established rules that govern your
                    protection under these religions, those organizations really
                    cannot protect you.</p>
                <p><em>&emsp;Example One: Many people have tried to use their
                    religion as a defense for legally using their healing
                    modalities. In times past a healer could say, “I am a
                    Christian so it is my religious belief that I can to do
                    such and such healing action.” Now in court, that
                    person must prove that they are not looking for a legal
                    loophole. They also must prove their sincerity and a
                    continued religious pattern of behavior.</em></p>
                <p><em>&emsp;Precedence has also been established where a judge
                    can interpret your religious beliefs for you. Using the
                    Christian defense above, the judge can simply say, “I
                    am a Christian too and I don’t believe the same way
                    you do so your defense is not valid.”
                    When asked about using your religion as a defense,
                    Judge Zvenia basically said that he has never seen a
                    church member (other than the Native American
                    Church) win in court over the charge of practicing
                    medicine without a license solely for the religious
                    exemption. They have always had to also be licensed
                    by a government-approved board.</em></p>
                <p><em>&emsp;Sadly, most of the religious organizations that are
                    spouting protect do not even meet the basic IRS and
                    federal governments&#39; requirements let alone establish
                    your sincerity and behavior pattern.</em></p>
                <p><em>&emsp;Those religions also do not offer you the simple
                    protection of Congressional Acts (where a judge
                    cannot dictate your religious beliefs) that the Native
                    Americans now enjoy and the United Nations
                    protection where the government is bound to protect
                    your Native American cultural heritage.</em></p>
                <p><em>&emsp;Example Two: Did you know that it is perfectly legal
                    for the U.S. government to medically experiment on
                    its citizens and they have done so? They have legally
                    performed biological warfare experiments, forced
                    inoculations with potentially harmful or deadly
                    vaccines, and also forced citizens to undergo
                    potentially deadly medical treatments that were
                    unnecessary.</em></p>
                <p><em>&emsp;When an individual joins our church through the
                    Spiritual Adoption process, they have legal
                    declarations that their intentions are religious, they
                    are deemed an “Indian” under the law, and are
                    protected from the unethical yet legal governmental
                    practices. The forcing of any “Indian” to participate in
                    medical treatments or a forced vaccination process is
                    considered “Ethnic Cleansing” under World Law.</em></p>
                <p>&emsp;Join the New Haven Native American Church religious
                    movement and take a stand to protect our Healing
                    Ministry, Traditions, Ceremonies, and Religious Freedom!
                    We desire all peoples around the world to be fully
                    protected under the law to follow their religion and to use
                    their healing modalities.</p>
                <p>&emsp;Even though many religions try to restrict their beliefs, we
                    find it perfectly acceptable to have the beliefs of another
                    organized religion and still be a member of our Church.
                    For thousands of years, the Native American religions did
                    not dictate any official religious dogma over their
                    members, ministers, and healers. Often different Native
                    American Church’s had conflicting beliefs, like different
                    colors or totems used to represent the Medicine Wheel,
                    but they would allow their followers to choose for
                    themselves.</p>
                <p>&emsp;Sadly, in modern times there has been a movement to
                    control or restrict beliefs in some of the Native American
                    Churches. Also, some Native American Churches or
                    Government Recognized Tribes think they have the
                    authority to dictate their opinions and beliefs onto other
                    Native American Churches.</p>
                <p><em>&emsp;Example One: There are some Native American
                    Churches that will not allow a “White Man” into their
                    ceremony even though historically it has been proven
                    that their ancestors did not follow that belief.</em></p>
                <p><em>&emsp;Example Two: Some established Native American
                    Churches think that all other Native American
                    Churches should run their Peyote Ceremonies the
                    way they do. They also issue edicts claiming to
                    restrict other ceremonial sacraments from other
                    church organizations just because the practice was
                    lost or not a part of their tribal culture. This is like the
                    Catholic Church issue edicts against the Baptist
                    Church or the Jews issuing edicts against all of
                    Christianity. This type of thinking is just silly and
                    clearly not a Spirit based way of running things.</em></p>
                <p><em>&emsp;Example Three: The title of Native American Church
                    has gotten the general misconception that it is a
                    Peyote Religion. This is not the case. There are
                    Native American Churches established in North
                    America that have the direct Indian authority that do
                    not even use Peyote in their ceremonies. Just like
                    there are numerous Christian Churches with different
                    belief systems there are numerous Native American
                    Churches with different general belief systems. The
                    only requirement to be a “True” Native American
                    Church is to have a line of authority duly established
                    from any Native American Church or government
                    recognized tribe in North, Central, or South America.
                    (All indigenous peoples from those continents are
                    truly Native Americans!!!)</em></p>
                <p>&emsp;In following our ancestral traditions, the New Haven Native
                    American Church does not dictate official religious dogma
                    over our members. We do require our members to agree
                    to abide by the simple truths found in our Constitution and
                    Ethical Code of Conduct but we allow our members to
                    exercise the freedom to follow the unique Spiritual Path
                    the Creator has for them.  They follow the dictates of their
                    own hearts and can choose their own form of worship and
                    ministry.  Members can follow the Spiritual truths of our
                    ancient Native American Ancestors from North, Central,
                    and South American as well as the many different
                    indigenous cultures from around the world.  They can
                    even choose to participate or not to participate in whatever
                    bona fide Traditional Ceremonies we have to offer.</p>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing
Home.propTypes = {
    hands: PropTypes.string.isRequired,
    homes: PropTypes.string.isRequired,
    people: PropTypes.string.isRequired,
    cookiePolicyDisplayed: PropTypes.bool.isRequired,
    setCookiePolicyDisplayed: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}
