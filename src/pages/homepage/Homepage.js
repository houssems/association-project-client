import charityImg from '../../images/parallax/charity.svg';
import protectionImg from '../../images/parallax/protection.svg';
import projectsImg from '../../images/parallax/projects.svg';
import partnersImg from '../../images/parallax/partners.svg';
import beneficiaryImg from '../../images/parallax/beneficiary.svg';
import './homepage.css';
import {
    MouseParallaxContainer
} from "../../libs/react-parallax-mouse/Container";
import {
    MouseParallaxChild
} from "../../libs/react-parallax-mouse/Child";
import {useNavigate} from "react-router-dom";
import {PATH_ASSOCIATION} from "../../routes/paths";
import {AuthModal} from "../../modals";
import UserInfo from "../../components/header/UserInfo";

function Homepage() {

    const navigate = useNavigate();

    const navigateTo = () => {
        console.log(PATH_ASSOCIATION.status)
        navigate(PATH_ASSOCIATION.status)
    }

    return (<div role="main" className="main">
        <section className={"homepage__section1"}>
            <div className={'homepage__header'}>
                <h3 className={'homepage__header__subtitle'}>
                    Welcome to
                </h3>
                <h1 className={'homepage__header__title'}>
                    Hdadra Association
                </h1>
                <div className={"homepage__user"}>
                    <UserInfo/>
                </div>
            </div>


            <div className={'homepage_selectSection'}>
                <MouseParallaxContainer
                    className="parallax"
                    containerStyle={{
                        width: "100%", display: "grid", gridTemplateColumns: "auto auto auto auto auto"
                    }}
                    globalFactorX={0.3}
                    globalFactorY={0.3}
                    resetOnLeave
                >
                    <MouseParallaxChild
                        factorX={0.6}
                        factorY={0.1}
                        className={'homepage_selectSection__background'}
                        style={{
                            backgroundPositionY: "50%",
                            transform: "scale(1.2)",
                            position: "absolute",
                            filter: "brightness(35%)",
                            backgroundSize: "auto",
                            backgroundRepeat: "repeat",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden"
                        }}
                    />
                    <MouseParallaxChild
                        factorX={0.5}
                        factorY={0.5}
                        style={{
                            filter: "invert(1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "auto",
                            height: "100%"
                        }}
                    >
                        <div className={'homepage_selectSection__itemContainer'} onClick={navigateTo}>
                            <object className={'homepage_selectSection__image'} data={charityImg}/>
                            <p>Association</p>
                        </div>
                    </MouseParallaxChild>
                    <MouseParallaxChild
                        factorX={0.7}
                        factorY={0.5}
                        style={{
                            filter: "invert(1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "auto",
                            height: "100%"
                        }}
                    >
                        <div className={'homepage_selectSection__itemContainer'}>
                            <object className={'homepage_selectSection__image'} data={protectionImg}/>
                            <p>Decouverte & Protection</p>
                        </div>
                    </MouseParallaxChild>
                    <MouseParallaxChild
                        factorX={0.9}
                        factorY={0.5}
                        style={{
                            filter: "invert(1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "auto",
                            height: "100%"
                        }}
                    >
                        <div className={'homepage_selectSection__itemContainer'}>
                            <object className={'homepage_selectSection__image'} data={partnersImg}/>
                            <p>Partenaires</p>
                        </div>
                    </MouseParallaxChild>
                    <MouseParallaxChild
                        factorX={0.7}
                        factorY={0.5}
                        style={{
                            filter: "invert(1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "auto",
                            height: "100%"
                        }}
                    >
                        <div className={'homepage_selectSection__itemContainer'}>
                            <object className={'homepage_selectSection__image'} data={beneficiaryImg}/>
                            <p>Bénéficiaires</p>
                        </div>
                    </MouseParallaxChild>
                    <MouseParallaxChild
                        factorX={0.5}
                        factorY={0.5}
                        style={{
                            filter: "invert(1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "auto",
                            height: "100%"
                        }}
                    >
                        <div className={'homepage_selectSection__itemContainer'}>
                            <object className={'homepage_selectSection__image'} data={projectsImg}/>
                            <p>Projets</p>
                        </div>
                    </MouseParallaxChild>
                </MouseParallaxContainer>
            </div>
        </section>


    </div>);
}

export default Homepage;
