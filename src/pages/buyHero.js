import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PurchaseBackButton from '../components/purchaseBackButton';
import PurchaseItemDetailPicture from '../components/purchaseItemDetailPicture';
import PurchaseItemDetailName from '../components/purchaseItemDetailName';
import PurchaseItemDetailFigureBox from '../components/purchaseItemDetailFigureBox';
import PurchaseItemDetailType from '../components/purchaseItemDetailType';
import env from "react-dotenv";
import {moneyWithTwoDecimal} from '../functionallity/dataConvertor';

import { ReactComponent as IconHelmet } from '../img/buybox/helmet.svg';
import { ReactComponent as IconRarity } from '../img/buybox/rarity.svg';
import { ReactComponent as IconShield } from '../img/buybox/shield.svg';

export default function BuyBox(){
    const { t } = useTranslation();
    const heroNumber = [1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    const ecoinPrice = env.COMMON_BOX_ECOIN_PRICE;
    const currencyPrice = env.COMMON_BOX_CURRENCY_PRICE;
    const [number, setNumber] = useState(1);
    const [boxPrice, setBoxPrice] = useState(ecoinPrice);
    const [boxCurrencyPrice, setBoxCurrencyPrice] = useState(currencyPrice);
    const [figureMinus, setFigureMinus] = useState(false);
    const [figurePlus, setFigurePlus] = useState(false);
    const [tabActive, setTabActive] = useState([true, false]);

    const getId = window.location.pathname.split("/");
    // const heroId = getId[2];
    const heroClass = 'THE PROTECTIVE GUNNER';
    const heroName = 'VEINKA'
    const heroRarity = 'common';
    const heroId = 0;

    if(heroId === undefined){
        window.location = env.URL_BUY_PAGE;
    }

    function figureHandler(e){
        const validation = new RegExp(env.REGEX_NUMBERIC);
        if(parseInt(e.target.value) === 0 || e.target.value.length < 1){
            setNumber(0);
            setFigureMinus(true);
        }
        else{
            setFigureMinus(false);
        }

        if(parseInt(e.target.value) >= parseInt(env.MAX_PURCHASE_NUMBER)){
            setFigurePlus(true);
        }
        else{
            setFigurePlus(false);
        }
        
        if(validation.test(e.target.value)){
            let value = e.target.value;
            
            if(e.target.value.length > 1 && e.target.value.charAt(0) === "0"){
                value = e.target.value.substring(1);
            }

            setNumber(value);
        }

        priceCalculator(e.target.value);
    }

    function figureAdjustHandler(data){
        var thisNum;
        if(data === "+"){
            thisNum = number + 1;
            if(parseInt(thisNum) <= parseInt(env.MAX_PURCHASE_NUMBER)){
                setNumber(prev => parseInt(prev) + 1);
                priceCalculator(thisNum);
            }

            if(parseInt(thisNum) < parseInt(env.MAX_PURCHASE_NUMBER)){
                setFigurePlus(false);
                setFigureMinus(false);
            }
            else{
                setFigurePlus(true);
            }
        }
        else{
            thisNum = number - 1;
            if(parseInt(thisNum) >= 0){
                setNumber(prev => parseInt(prev) - 1);
                priceCalculator(thisNum);
            }
            
            if(parseInt(thisNum) > 0){
                setFigurePlus(false);
                setFigureMinus(false);
            }
            else{
                setFigureMinus(true);
            }
        }
    }

    function priceCalculator(num){
        const totalEcoin = num * ecoinPrice;
        const totalCurrency = moneyWithTwoDecimal(num * currencyPrice);

        setBoxPrice(totalEcoin);
        setBoxCurrencyPrice(totalCurrency);
    }

    function tabHandler(data){
        const temp = tabActive.map(x => false);
        temp[data] = true;
        setTabActive(temp);
    }

    return <>
        <div>
            <div style={{position: 'relative'}}>
                <Container>
                    <Row>
                        <Col>
                            <PurchaseBackButton link='/buy' name={t('go_back')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <PurchaseItemDetailPicture 
                                bgLabel={require('../img/buybox/box_'+heroRarity+'_label_bg.png')} 
                                heroImg={require('../img/buy/skin/'+heroId+'.png')}
                                static={true}
                            />
                        </Col>
                        <Col>
                            <PurchaseItemDetailName colorType={heroRarity} name={heroClass} type={heroName} />
                            
                            <div className='buybox_remaining_container'>
                                <div>
                                    <PurchaseItemDetailType
                                        icon={IconHelmet}
                                        title={t('skin_rarity')}
                                        value={t('normal')}
                                        tooltips={true}
                                        tooltipTitle={t('skin_rarity')}
                                        tooltipsContent='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    />
                                </div>
                                <div>
                                    <PurchaseItemDetailType
                                        icon={IconRarity}
                                        title={t('hero_rarity')}
                                        value={t('common')}
                                        tooltips={true}
                                        tooltipTitle={t('hero_rarity')}
                                        tooltipsContent='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    />
                                </div>
                                <div>
                                    <PurchaseItemDetailType
                                        icon={IconShield}
                                        title={t('hero_class')}
                                        value={t('tankly')}
                                        tooltips={true}
                                        tooltipTitle={t('hero_class')}
                                        tooltipsContent='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    />
                                </div>
                            </div>

                            <PurchaseItemDetailFigureBox 
                                quantityControl={false} 
                                boxPrice={boxPrice}
                                boxCurrencyPrice={boxCurrencyPrice}
                                figureMinus={figureMinus}
                                figurePlus={figurePlus}
                                figureAdjustHandler={figureAdjustHandler}
                                figureHandler={figureHandler}
                                number={number}
                                buttonText={t('purchase')}
                            />
                            
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <Row>
                    <Col>
                        <div className='tabs_container mt-5'>
                            <div className={tabActive[0] ? 'active' : ''} onClick={() => tabHandler(0)}>{t('p2e_info')}</div>
                            <div className={tabActive[1] ? 'active' : ''} onClick={() => tabHandler(1)}>{t('stats')}</div>
                        </div>

                        {tabActive[0] && <div>
                            <div className="purchase_card">
                                123
                            </div>
                        </div>}

                        {tabActive[1] && <div>
                            <div className='purchase_card'>
                                321
                            </div>
                        </div>}
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}